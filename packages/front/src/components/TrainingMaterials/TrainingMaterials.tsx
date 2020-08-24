import React from "react";
import { Card, Button, Empty, Upload } from "antd";
import "./TrainingMaterials.css";
import { graphql } from "react-relay";
import { useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { TrainingMaterialsMutation } from "./__generated__/TrainingMaterialsMutation.graphql";
import { useParams } from "react-router-dom";
import { TrainingMaterialsQuery } from "./__generated__/TrainingMaterialsQuery.graphql";
import { Material } from "../../utils/types";
import { AlertContext } from "../../hoc/Alert/AlertContext";
import { useOktaAuth } from "@okta/okta-react";

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
  const [response, setResponse] = React.useState<{
    filename: string;
    originName: string;
  }>();
  const [commit, isInFlight] = useMutation<TrainingMaterialsMutation>(mutation);
  const { materialsByTrainingId } = useLazyLoadQuery<TrainingMaterialsQuery>(
    query,
    { trainingId },
    { fetchPolicy: "store-and-network" }
  );
  const [materials, setMaterials] = React.useState<Material[]>([]);
  const { showAlert } = React.useContext(AlertContext);
  const [uploadingMaterials, setUploadingMaterials] = React.useState<{
    [filename: string]: number;
  }>({});

  const fileUploadProps: any = {
    name: "file",
    showUploadList: { showRemoveIcon: false },
    action: `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/file/upload`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${authState.accessToken}`,
    },
    multiple: true,
    data: { type: "3" },
    fileList: materials.map((material) => ({
      uid: material.materialId,
      name: material.originName || material.link,
      status: material.status ? material.status : "done",
      url: material.link
        ? `${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/material/${material.link}`
        : "#",
    })),
    beforeUpload: (file: File, fileList: File[]) => {
      const uploadingFileId: number = Date.now() + Math.random();
      const uploadingFile = {
        materialId: uploadingFileId,
        originName: file.name,
        link: "",
        status: "uploading",
      };
      const uploadingFileNameWithId = { [file.name]: uploadingFileId };

      setUploadingMaterials((prev) => ({
        ...prev,
        ...uploadingFileNameWithId,
      }));
      setMaterials((prev) => [...prev, uploadingFile]);
    },
    onSuccess: (
      res: { filename: string; originName: string },
      file: File,
      xhr: any
    ) => {
      setResponse(res);
    },
    onError: (error: Error, response: any, file: File) => {
      showAlert(`При загрузке файла ${file.name} произошла ошибка`, "error");
      setMaterials((prev) =>
        prev.map((material) => {
          const uploadingMaterialId: number | null = material.originName
            ? uploadingMaterials[material.originName]
            : null;
          if (
            uploadingMaterialId &&
            material.materialId === uploadingMaterialId &&
            material.originName
          ) {
            // delete uploadingMaterials[material.originName];

            return {
              ...material,
              status:
                material.status === "uploading" ? "error" : material.status,
            };
          } else {
            return material;
          }
        })
      );
    },
  };

  React.useEffect(() => {
    response?.filename &&
      commit({
        variables: {
          data: {
            link: response.filename,
            trainingId,
            originName: response.originName,
          },
        },
        onCompleted: (res) => {
          showAlert(
            `Материал ${res.createMaterial.originName} успешно добавлен`
          );
          setMaterials((prev) =>
            prev.map((material) => {
              const uploadingMaterialId: number | null = material.originName
                ? uploadingMaterials[material.originName]
                : null;
              if (
                uploadingMaterialId &&
                material.materialId === uploadingMaterialId &&
                material.originName
              ) {
                // delete uploadingMaterials[material.originName];

                return {
                  link: res.createMaterial.link,
                  originName: res.createMaterial.originName,
                  materialId: res.createMaterial.materialId,
                  status:
                    material.status === "uploading" ? "done" : material.status,
                };
              } else {
                return material;
              }
            })
          );
        },
        onError: () => {
          showAlert(
            `Ошибка в добавлении материала ${response.originName}`,
            "error"
          );
        },
      });
  }, [response]);

  React.useEffect(() => {
    setMaterials(materialsByTrainingId as Material[]);
  }, [materialsByTrainingId]);

  return (
    <>
      <h2>Материалы</h2>
      <div className="training-material-title">
        <Upload {...fileUploadProps}>
          <Button>Загрузить материал</Button>
        </Upload>
      </div>
      <Card>
        <div className="training-material-body">
          {materials.map((material: Material) => (
            <span>
              <a
                href={`${process.env.REACT_APP_SERVER_HOST_WITH_PORT}/material/${material.link}`}
              >
                {material.link}
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
