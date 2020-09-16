import React from "react";
import { Card, Button, Empty, Upload, Spin } from "antd";
import "./training-materials.css";
import { graphql } from "react-relay";
import { useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { TrainingMaterialsMutation } from "./__generated__/TrainingMaterialsMutation.graphql";
import { useParams } from "react-router-dom";
import { TrainingMaterialsQuery } from "./__generated__/TrainingMaterialsQuery.graphql";
import { Material } from "../../utils/types";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { useOktaAuth } from "@okta/okta-react";
import { FileIcon } from "../FileIcon/FileIcon";

const mutation = graphql`
  mutation TrainingMaterialsMutation($data: InputMaterial!) {
    createMaterial(data: $data) {
      link
      originName
      materialId: id
    }
  }
`;

const query = graphql`
  query TrainingMaterialsQuery($trainingId: Float!) {
    materialsByTrainingId(trainingId: $trainingId) {
      materialId: id
      link
      originName
    }
  }
`;

export const TrainingMaterials: React.FC = () => {
  const trainingId = Number(useParams<{ trainingId: string }>().trainingId);
  const { authState } = useOktaAuth();
  const [commit, isInFlight] = useMutation<TrainingMaterialsMutation>(mutation);
  const { materialsByTrainingId } = useLazyLoadQuery<TrainingMaterialsQuery>(
    query,
    { trainingId },
    { fetchPolicy: "store-and-network" }
  );
  const { showAlert } = React.useContext(AlertContext);
  const [materials, setMaterials] = React.useState<Material[]>([]);
  const [response, setResponse] = React.useState<{
    filename: string;
    originName: string;
  }>();
  const [uploadingMaterials, setUploadingMaterials] = React.useState<{
    [filename: string]: {
      temporaryId: number;
      response: {
        data: { filename: string; originName: string } | null;
      };
    };
  }>({});
  const [graphqlResponse, setGraphqlResponse] = React.useState<{
    [filename: string]: {
      data: {
        link: string;
        originName: string;
        materialId: number;
      };
    };
  }>({});
  const [materialsWithError, setMaterialsWithError] = React.useState<{
    [filename: string]: boolean;
  }>({});

  const fileUploadProps: any = {
    name: "file",
    showUploadList: false,
    action: `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/file/upload`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${authState.accessToken}`,
    },
    multiple: true,
    data: { type: "3" },
    // fileList: materials.map((material) => ({
    //   uid: material.materialId + material.link,
    //   name: material.originName || material.link,
    //   status: material.status ? material.status : "done",
    //   url: material.link
    //     ? `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/material/${material.link}`
    //     : "#clear",
    // })),
    beforeUpload: (file: File, fileList: File[]) => {
      const uploadingFileId: number =
        Date.now() + Math.round(Math.random() * 100);
      const uploadingFile: Material = {
        materialId: uploadingFileId,
        originName: file.name,
        link: "",
        status: "uploading",
      };

      setUploadingMaterials((prev) => ({
        ...prev,
        [file.name]: {
          temporaryId: uploadingFileId,
          response: { data: null },
        },
      }));
      setMaterials((prev) => [...prev, uploadingFile]);
    },
    onSuccess: (
      res: { filename: string; originName: string },
      file: File,
      xhr: any
    ) => {
      setResponse(() => res);
    },
    onError: (error: Error, response: any, file: File) => {
      showAlert(`При загрузке файла ${file.name} произошла ошибка`, "error");
      setMaterialsWithError((prev) => ({ ...prev, ...{ [file.name]: true } }));
    },
  };

  React.useEffect(() => {
    if (response?.originName && response.filename) {
      const uploadingMaterial = uploadingMaterials[response?.originName];

      uploadingMaterial.response.data = response;

      const oldUploadingFileWithNewResponseData = {
        [response?.originName]: uploadingMaterial,
      };

      setUploadingMaterials((prev) => ({
        ...prev,
        ...oldUploadingFileWithNewResponseData,
      }));
      commit({
        variables: {
          data: {
            link: response.filename,
            trainingId,
            originName: response.originName,
          },
        },
        onCompleted: (res) => {
          if (res.createMaterial.originName) {
            const materialFromMutationResponse = {
              [res.createMaterial.originName]: {
                data: {
                  link: res.createMaterial.link,
                  materialId: res.createMaterial.materialId,
                  originName: res.createMaterial.originName,
                },
              },
            };
            setGraphqlResponse((prev) => ({
              ...prev,
              ...materialFromMutationResponse,
            }));
          }
          showAlert(
            `Материал ${res.createMaterial.originName} успешно добавлен`
          );
        },
        onError: () => {
          showAlert(
            `Ошибка в добавлении материала ${response.originName}`,
            "error"
          );
        },
      });
    }
  }, [response]);

  React.useEffect(() => {
    setMaterials((prev) =>
      prev.map((material) => {
        if (material.originName && materialsWithError[material.originName]) {
          return {
            ...material,
            status: "error",
          };
        } else {
          return material;
        }
      })
    );
  }, [materialsWithError]);

  React.useEffect(() => {
    setMaterials((prev) =>
      prev.map((material) => {
        if (
          material.originName &&
          uploadingMaterials[material.originName] &&
          uploadingMaterials[material.originName].temporaryId
        ) {
          const uploadingMaterialId: number =
            uploadingMaterials[material.originName].temporaryId;
          const materialDataFromGraphqlResponse =
            graphqlResponse[material.originName];

          if (
            material.materialId === uploadingMaterialId &&
            materialDataFromGraphqlResponse &&
            materialDataFromGraphqlResponse.data
          ) {
            return {
              link: materialDataFromGraphqlResponse.data.link,
              originName: materialDataFromGraphqlResponse.data.originName,
              materialId: materialDataFromGraphqlResponse.data.materialId,
              status: "done",
            };
          } else {
            return material;
          }
        } else {
          return material;
        }
      })
    );
  }, [graphqlResponse]);

  React.useEffect(() => {
    setMaterials(materialsByTrainingId as Material[]);
  }, [materialsByTrainingId]);

  return (
    <>
      <div className="training-material-title">
        <div className="training-material__material-count">
          <h2>Материалы</h2>
          <span>{materials.length} доступно</span>
        </div>
        <Upload {...fileUploadProps}>
          <Button type="link" className="training-material__upload-btn">
            Загрузить материал
          </Button>
        </Upload>
      </div>
      <Card className="training-material-card">
        <div className="training-material-body">
          {materials.map((material: Material) => (
            <span key={material.link + material.materialId}>
              {material.status === "uploading" && <Spin size="small" />}
              <FileIcon filename={material.originName} />
              <a
                href={
                  material.link
                    ? `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/material/${material.link}`
                    : undefined
                }
                style={material.status === "error" ? { color: "#ff4d4f" } : {}}
              >
                {material.originName || material.link}
              </a>
            </span>
          ))}
          {!(materials.length > 0) && (
            <div style={{ margin: "auto" }}>
              <Empty description="В событии пока нет материалов" />
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
