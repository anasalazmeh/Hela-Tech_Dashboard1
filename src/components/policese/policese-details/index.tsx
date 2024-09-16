import {
  Descriptions as AntdDescriptions,
  Col,
  Descriptions,
  Image,
  Row,
  Spin
} from "antd";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PoliceseContext from "../../../context/policese/context";
import PoliceseContextProvider from "../../../context/policese/provider";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";

interface Props {}

const PoliceseDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(PoliceseContext);
  const { name } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      name && (await actions.getDetails(name));
    };
    getDetails();
  }, []);

  return (
    <>
      <PageHeader
        title={"Policese Details"}
        subTitle={"Policese specefic details"}
      />
      <div className={styles.container}>
        {loading.includes("details") ? (
          <div className={styles.spinner}>
            <div>
              <Spin />
            </div>
          </div>
        ) : (
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Descriptions size="middle" column={1} bordered>
                <AntdDescriptions.Item label={"Id"} labelStyle={{width:"200px"}}>
                  {details?.id}
                </AntdDescriptions.Item>


                <AntdDescriptions.Item label={"Name English"}>
                  {details?.name.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Name Arabi"}>
                  {details?.name.ar}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Description English"}  >
                  {details?.description.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Description Arabi"}>
                  {details?.description.ar}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Created at"}>
                  {details?.created_at}
                </AntdDescriptions.Item>

              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const PoliceseDetailsPage = () => {
  return (
    <PoliceseContextProvider>
      <PoliceseDetails />
    </PoliceseContextProvider>
  );
};
export default PoliceseDetailsPage;
