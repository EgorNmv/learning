import React from "react";
import { Card, Button, Empty, Upload } from "antd";
import "./TrainingMaterials.css";
import { useFileUpload } from "../../utils/utils";
import { graphql } from "react-relay";
import { useMutation, useLazyLoadQuery } from "react-relay/hooks";
import { TrainingMaterialsMutation } from "./__generated__/TrainingMaterialsMutation.graphql";
import { useParams } from "react-router-dom";
import { TrainingMaterialsQuery } from "./__generated__/TrainingMaterialsQuery.graphql";

const mutation = graphql`
  mutation TrainingMaterialsMutation($data: InputMaterial!) {
    createMaterial(data: $data) {
      link
    }
  }
`;

const query = graphql`
  query TrainingMaterialsQuery($trainingId: Float!) {
    materialsByTrainingId(trainingId: $trainingId) {
      link
    }
  }
`;

export const TrainingMaterials: React.FC = () => {
  const params = useParams<{ trainingId: string }>();
  const trainingId: number = Number(params.trainingId);
  const [isLoadingFile, sendFile] = useFileUpload<{ filename: string }>();
  const [response, setResponse] = React.useState<{ filename: string }>();
  const [commit, isInFlight] = useMutation<TrainingMaterialsMutation>(mutation);
  const { materialsByTrainingId } = useLazyLoadQuery<TrainingMaterialsQuery>(
    query,
    { trainingId }
  );

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File;

    if (event.target.files) {
      file = event.target.files[0];
      setResponse(await sendFile(file, "material"));
    }
  };

  React.useEffect(() => {
    response?.filename &&
      commit({
        variables: { data: { link: response.filename, trainingId } },
        onCompleted: () => {
          window.location.reload();
        },
      });
  }, [response]);

  return (
    <>
      <div className="training-material-title">
        <h2>Материалы</h2>
        <input
          style={{ visibility: 'hidden' }}
          disabled={isLoadingFile || isInFlight}
          type="file"
          id="file"
          onChange={uploadFile}
        />

        <Button onClick={() => {
          document.getElementById('file')?.click()
        }}>
          Загрузить материал
          </Button>

      </div>
      <Card>
        <div className="training-material-body">
          {materialsByTrainingId.map((material) => (
            <span>
              <a href={`http://localhost:4000/material/${material.link}`}>
                {material.link}
              </a>
            </span>
          ))}
          {materialsByTrainingId.length > 0 ? <></> : <div style={{ margin: 'auto' }}><Empty /></div>}
        </div>
      </Card>
    </>
  );
};
