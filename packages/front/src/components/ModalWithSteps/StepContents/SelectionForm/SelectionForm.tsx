import React from "react";
import { Form, Select, DatePicker } from "antd";
import { FormInstance } from "antd/lib/form/util";
import moment from "moment";
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

export const SelectionForm: React.FC<{ form: FormInstance }> = ({ form }) => {
  const { formats, organizers, targetAudiences, categories } = useLazyLoadQuery<
    SelectionFormQuery
  >(query, {});

  return (
    <Form form={form}>
      <Form.Item
        name="category"
        label="Категория:"
        rules={[{ required: true }]}
      >
        <Select>
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
    </Form>
  );
};
