import React from "react";
import { Form, Select, DatePicker, Button, Checkbox } from "antd";
import { FormInstance } from "antd/lib/form/util";
import "moment/locale/ru";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "react-relay/hooks";
import { SelectionFormQuery } from "./__generated__/SelectionFormQuery.graphql";

const query = graphql`
  query SelectionFormQuery {
    targetAudiences {
      targetAudienceId: id
      description
    }
    organizers {
      organizerId: id
      name
    }
    formats {
      formatId: id
      description
    }
    categories {
      categoryId: id
      description
    }
  }
`;

export const SelectionForm: React.FC<{
  form: FormInstance;
  onClickNext: () => void;
}> = ({ form, onClickNext }) => {
  const { formats, organizers, targetAudiences, categories } = useLazyLoadQuery<
    SelectionFormQuery
  >(query, {});

  const checkOnDisabledBtn = (): boolean => {
    return (
      !form.isFieldTouched("category") ||
      !form.isFieldTouched("organizer") ||
      !form.isFieldTouched("targetAudience") ||
      !form.isFieldTouched("trainingFormat") ||
      !form.isFieldTouched("startAndEndDates") ||
      form.getFieldsError().filter(({ errors }) => errors.length).length > 0
    );
  };

  return (
    <Form form={form}>
      <Form.Item
        name="category"
        label="Категория:"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value={0}>Все</Select.Option>
          {categories.map((category) => (
            <Select.Option value={category.categoryId}>
              {category.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="organizer"
        label="Организатор:"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value={0}>Все</Select.Option>
          {organizers.map((organizer) => (
            <Select.Option value={organizer.organizerId}>
              {organizer.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="targetAudience"
        label="Целевая аудитория:"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value={0}>Все</Select.Option>
          {targetAudiences.map((targetAudience) => (
            <Select.Option value={targetAudience.targetAudienceId}>
              {targetAudience.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="trainingFormat"
        label="Формат обучения:"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value={0}>Все</Select.Option>
          {formats.map((format) => (
            <Select.Option value={format.formatId}>
              {format.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="startAndEndDates"
        label="Даты проведения:"
        rules={[{ required: true }]}
      >
        <DatePicker.RangePicker
          format={"DD.MM.YYYY"}
          placeholder={["Дата начала", "Дата конца"]}
        />
      </Form.Item>
      <Form.Item name="withTrainingsWithoutDate" valuePropName="checked">
        <Checkbox>Включая события с неопределённой датой</Checkbox>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <>
            <Button
              className="report-modal__next-btn"
              type="primary"
              disabled={checkOnDisabledBtn()}
              onClick={() => {
                onClickNext();
                form.resetFields();
              }}
            >
              Далее
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};
