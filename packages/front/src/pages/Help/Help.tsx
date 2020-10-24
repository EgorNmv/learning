import React from "react";
import { Collapse } from "antd";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const Help: React.FC = () => {
  return (
    <section>
      <Breadcrumbs />
      <h2>Помощь</h2>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="This is panel header 1" key="1">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            velit commodi facere id consectetur nulla, quasi quo dolore dolorem
            odio nesciunt perspiciatis, sequi doloremque reiciendis tenetur
            animi similique repellat totam.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            iusto quo obcaecati ducimus neque expedita provident veritatis ipsa
            suscipit, iste consequuntur porro totam eius optio, repellendus
            facere id reprehenderit maiores.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            eveniet repellat aperiam totam placeat, consectetur, consequatur
            quia minima porro quos beatae eaque corrupti quod animi nulla?
            Officia rem ratione tempora?
          </p>
        </Collapse.Panel>
      </Collapse>
    </section>
  );
};

export default Help;
