import { Button, Col, Divider, Row } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import PoliceseContext from "../../../context/policese/context";
import PoliceseContextProvider from "../../../context/policese/provider";
import http from "../../../api/axios";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions,list } = useContext(PoliceseContext);

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      const data =(await http.get("/pages")).data.data;
      const items = data.find((item:any) => item.id === Number(id));
      console.log(items);
      await actions.getDetails(items?.key);
    };

    if (id) {
      getDetails();
    }
  }, []);

  return (
    <>
      <PageHeader
        title={details ? "Update policese" : "Create policese"}
        subTitle={details ? "Updating the policese " : "Adding a new policese"}
        extra={[
          <Button
            key={0}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>,
          <Divider key={1} type="vertical" />,
          <Button
            loading={loading.includes("update")}
            form="service-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
      />

      <MainForm
        formId="service-form"
        title="Create consultant"
        subTitle="Adding a new consultant"
        onSubmit={async (data) => {
          details && (await actions.updateConsultants(details?.id, data));
        }}
        defaultValues={{
          name_en: details?.name.en,
          name_ar: details?.name.ar,
          description_en: details?.description.en,
          description_ar: details?.description.ar,
        }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Name English"
              rules={{ required: true }}
              name="name_en"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Name Arabi"
              rules={{ required: true }}
              name="name_ar"
              input={{ type: "text" }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={24}>
            <FieldBuilder
              label="Description English"
              rules={{ required: true }}
              name="description_en"
              input={{ type: "simple" }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={24}>
            <FieldBuilder
              label="Description Arabi"
              rules={{ required: true }}
              name="description_ar"
              input={{ type: "simple" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const PoliceseForm = () => {
  return (
    <PoliceseContextProvider>
      <Form />
    </PoliceseContextProvider>
  );
};

export default PoliceseForm;
