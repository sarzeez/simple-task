import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import request from "../../services/api";
import CustomHeader from "../Header/Header";
import Board from "../Board/Board";
const { Header, Sider, Content } = Layout;

const Home = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    collapsed: false,
  });
  const [getListTable, setGetListTable] = useState({
    rows: [],
    total: 0,
  });

  const [filteredListTable, setFilteredListTable] = useState({
    rows: [],
    total: 0,
  });
  const [isSearched, setIsSearched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const getList = () => {
    setLoading(true);
    request.board
      .getList({})
      .then((res) => {
        setGetListTable({
          rows: res.data.items,
          total: res.data.total_count,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onSearch = () => {
    setIsSearched(true);
    const newData = getListTable.rows.filter((item: any) =>
      item?.name?.toLowerCase()?.includes(searchValue)
    );
    setFilteredListTable({
      rows: newData,
      total: newData.length,
    });
  };

  const onChangeSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value === "") {
      setFilteredListTable({
        rows: [],
        total: 0,
      });
      setIsSearched(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Layout>
      <Sider
        style={{ minHeight: "100vh", position: "fixed" }}
        trigger={null}
        collapsible
        collapsed={state.collapsed}
      >
        <div className="logo">user</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{ marginLeft: `${state.collapsed ? "80px" : "200px"}` }}
        className="site-layout"
      >
        <Header
          className="site-layout-background"
          style={{ padding: "0 16px" }}
        >
          <CustomHeader state={state} toggle={toggle} />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "16px",
            padding: 24,
            minHeight: "auto",
          }}
        >
          <Board
            loading={loading}
            getListTable={isSearched ? filteredListTable : getListTable}
            filteredListTable={filteredListTable}
            isSearched={isSearched}
            onSearch={onSearch}
            onChangeSearch={onChangeSearch}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
