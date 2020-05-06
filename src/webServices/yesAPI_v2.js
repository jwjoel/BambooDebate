import axios from "axios";
import debug from "./debug";
import md5 from "js-md5";
const CONFIG = {
  // INTERFACE_URL : 'https://puluter.cn/server.php',
  INTERFACE_URL: "/server.php"
};

const API_OBJ = {
  PREFIX: CONFIG.INTERFACE_URL + "?s=",
  USER_REGISTER: "App.User.Register",
  USER_LOGIN: "App.User.Login",
  USER_CHANGE_PROPS: "App.User.UpdateExtInfo",
  USER_CHECK_IF_LOGIN: "App.User.Check",
  USER_EXT_INFO: "App.User.OtherProfile",
  USER_CHANGE_ROLE: "App.User.ChangeRole",
  USER_LOGOUT: "App.User.Logout",
  USER_SEARCH: "App.User.Search",

  TABLE_CREATE: "App.Table.Create",
  TABLE_READ: "App.Table.FreeFindOne",
  TABLE_UPDATE_WHERE: "App.Table.FreeUpdate",
  TABLE_READ_PAGE: "App.Table.FreeQuery",
  TABLE_UNION_QUERY: "App.Table.FreeLeftJoinQuery"
};

function hGet(url, funcs) {
  axios
    .get(url)
    .then(ret => {
      funcs.success(ret);
    })
    .catch(ret => {
      funcs.fail(ret);
    });
}

let { PREFIX } = API_OBJ;
const yesapi = {
  user: {
    /**
     * 用户登录接口
     * @param username string
     * @param password string
     * @param funcs
     */
    login: function(username, password, funcs) {
      //app_key,password,s,username,secret
      let passwordMD5 = md5(password);
      let url =
        PREFIX +
        API_OBJ.USER_LOGIN +
        `&username=${username}&password=${passwordMD5}`;
      hGet(url, funcs);
    },
    /**
     * 用户注册接口
     * @param username string
     * @param password string
     * @param extData json->{a:123}
     * @param funcs
     * @example yesapi_mobile
     */
    register: function(username, password, extData, funcs) {
      //app_key ext_info password s username
      let passwordMD5 = md5(password);
      let dataStr = JSON.stringify(extData);
      let url =
        PREFIX +
        API_OBJ.USER_REGISTER +
        `&ext_info=${dataStr}&username=${username}&password=${passwordMD5}`;
      hGet(url, funcs);
    },
    /**
     * 用户身份修改接口
     * @param uuid string
     * @param token string
     * @param new_role string
     * @param funcs
     * @example yesapi_mobile
     */
    changeRole: function(uuid, token, new_role, funcs) {
      //app_key s token uuid
      let PORT = API_OBJ.USER_CHANGE_ROLE;
      let url =
        PREFIX + PORT + `&uuid=${uuid}&other_uuid=${uuid}&token=${token}&new_role=${new_role}`;
      hGet(url, funcs);
    },

    /**
     * 用户搜索接口
     * @param username string
     * @param password string
     * @param extData json->{a:123}
     * @param funcs
     * @example yesapi_mobile
     */
    userSearch: function(uuid, token, username, funcs) {
      //app_key s token uuid
      let PORT = API_OBJ.USER_SEARCH;
      let url =
        PREFIX + PORT + `&uuid=${uuid}&token=${token}&username=${username}`;
      hGet(url, funcs);
    },

    /**
     * 检查是否登录
     * @param uuid
     * @param token
     * @param funcs
     * @example
     * data.err_code 0已登录1未登录
     */
    checkIfLogin: function(uuid, token, funcs) {
      //app_key s token uuid
      let PORT = API_OBJ.USER_CHECK_IF_LOGIN;
      let url = PREFIX + PORT + `&uuid=${uuid}&token=${token}`;
      hGet(url, funcs);
    },
    /**
     * 退出登录
     * @param uuid
     * @param token
     * @param funcs
     * @example
     * data.err_code 0已登录1未登录
     */
    logOut: function(uuid, token, funcs) {
      //app_key s token uuid
      let PORT = API_OBJ.USER_LOGOUT;
      let url = PREFIX + PORT + `&uuid=${uuid}&token=${token}`;
      hGet(url, funcs);
    },
    /**
     * 获取一个用户的额外信息
     * @param uuid string
     * @param token string
     * @param funcs retFunc
     */
    getExtInfo: function(uuid, token, funcs) {
      //app_key other_uuid s token
      let PORT = API_OBJ.USER_EXT_INFO;
      let url = PREFIX + PORT + `&other_uuid=${uuid}&token=${token}`;
      hGet(url, funcs);
    },
    /**
     * 使用token来更新用户额外信息
     * @param uuid
     * @param extData
     * @param token
     * @param funcs
     */
    updateExtInfo: function(uuid, extData, token, funcs) {
      debug(arguments);
      //app_key ext_info sign token uuid
      let dataStr = JSON.stringify(extData);
      let url =
        PREFIX +
        API_OBJ.USER_CHANGE_PROPS +
        `&ext_info=${dataStr}&uuid=${uuid}&token=${token}`;
      hGet(url, funcs);
    }
  },
  table: {
    /**
     * 使用UUID创建一条数据
     * @param table_name string
     * @param data {a:123,b:234}
     * @param uuid string
     * @param token string
     * @param funcs retFunc
     */
    createWithUUID_T: function(table_name, data, uuid, token, funcs) {
      //app_key data model_name s uuid token
      let PORT, url;
      let dataStr;
      //Define User Data
      dataStr = JSON.stringify(data);
      //Define Post Data
      PORT = API_OBJ.TABLE_CREATE;
      url =
        PREFIX +
        PORT +
        `&data=${dataStr}&uuid=${uuid}&token=${token}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 使用UUID创建一条数据
     * @param table_name string
     * @param data {a:123,b:234}
     * @param uuid string
     * @param funcs
     */
    createWithUUID: function(table_name, data, uuid, funcs) {
      //app_key data model_name s uuid
      let PORT, url;
      let dataStr;
      //Define User Data
      dataStr = JSON.stringify(data);
      //Define Post Data
      PORT = API_OBJ.TABLE_CREATE;
      url =
        PREFIX +
        PORT +
        `&data=${dataStr}&uuid=${uuid}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 不使用UUID创建一条数据
     * @param table_name string
     * @param data {a:123,b:234}
     * @param funcs
     */
    createWithoutUUID: function(table_name, data, funcs) {
      //app_key data model_name s
      let PORT, url;
      let dataStr;
      //Define User Data
      dataStr = JSON.stringify(data);
      //Define Post Data
      PORT = API_OBJ.TABLE_CREATE;
      url = PREFIX + PORT + `&data=${dataStr}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },

    /**
     * 使用UUID查询查询一条数据
     * @param table_name string
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param uuid string
     * @param funcs
     */
    readOneWithUUID: function(table_name, where, logic, uuid, funcs) {
      //app_key logic model_name s uuid where
      let PORT, url;
      let dataStr;
      //Define User Data
      dataStr = JSON.stringify(where);
      //Define Post Data
      PORT = API_OBJ.TABLE_READ;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr}&uuid=${uuid}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 不使用UUID查询一条数据
     * @param table_name string
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param funcs
     */
    readOneWithoutUUID: function(table_name, where, logic, funcs) {
      //app_key logic model_name s uuid where
      let PORT, url;
      let dataStr;
      //Define User Data
      dataStr = JSON.stringify(where);
      //Define Post Data
      PORT = API_OBJ.TABLE_READ;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },

    /**
     * 使用UUID来以页为单位查询数据
     * @param table_name
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param page number
     * @param perPage number
     * @param uuid
     * @param funcs
     */
    readPageWithUUID: function(
      table_name,
      where,
      logic,
      page,
      perPage,
      uuid,
      funcs
    ) {
      //app_key logic model_name page perpage s uuid where
      let PORT, url, dataStr;
      //Define User Data
      dataStr = JSON.stringify(where);
      //Define Post Data
      PORT = API_OBJ.TABLE_READ_PAGE;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr}&page=${page}&perpage=${perPage}&model_name=${table_name}&uuid=${uuid}`;
      //Execute Post
      hGet(url, funcs);
    },
        /**
     * 使用UUID来以页为单位查询数据
     * @param table_name
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param page number
     * @param perPage number
     * @param uuid
     * @param funcs
     */
    readPageSelect: function(
      table_name,
      where,
      logic,
      page,
      perPage,
      uuid,
      select,
      funcs
    ) {
      //app_key logic model_name page perpage s uuid where
      let PORT, url, dataStr;
      //Define User Data
      dataStr = JSON.stringify(where);
      //Define Post Data
      PORT = API_OBJ.TABLE_READ_PAGE;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr}&page=${page}&perpage=${perPage}&model_name=${table_name}&uuid=${uuid}&select=${select}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 不使用UUID来以页为单位查询数据
     * @param table_name string
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param page number
     * @param perPage number
     * @param funcs
     */
    readPageWithoutUUID: function(
      table_name,
      where,
      logic,
      page,
      perPage,
      funcs
    ) {
      //app_key logic model_name page perpage s where
      let PORT, url, dataStr;
      //Define User Data
      dataStr = JSON.stringify(where);
      //Define Post Data
      PORT = API_OBJ.TABLE_READ_PAGE;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr}&page=${page}&perpage=${perPage}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    },

    /**
     * 使用UUID来进行联合查询
     * @param table_name
     * @param join_table_name
     * @param join_select
     * @param on
     * @param where
     * @param logic
     * @param page
     * @param perPage
     * @param uuid
     * @param funcs
     * @example on：{"cate_id":"id"} cate_id是主表中的字段名，id是副表中的字段名
     * @example where：[ ["TL.view_times",">=",100], ["TR.is_show","=",1]] TL代表主表中的查询，TR代表副表中的查询
     * @example join_select： cate_id,id,views
     */
    readUnionQueryWithUUID: function(
      table_name,
      join_table_name,
      join_select,
      on,
      where,
      logic,
      page,
      perPage,
      uuid,
      funcs
    ) {
      //app_key join_model_name join_select logic model_name on page perpage s uuid where
      let PORT, url, dataStr1, dataStr2;
      //Define User Data
      dataStr1 = JSON.stringify(where);
      dataStr2 = JSON.stringify(on);
      //Define Post Data
      PORT = API_OBJ.TABLE_UNION_QUERY;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr1}&page=${page}&perpage=${perPage}&model_name=${table_name}&uuid=${uuid}&join_model_name=${join_table_name}&join_select=${join_select}&on=${dataStr2}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 不使用UUID来进行联合查询
     * @param table_name
     * @param join_table_name
     * @param join_select
     * @param on
     * @param where
     * @param logic
     * @param page
     * @param perPage
     * @param funcs
     * @example on：{"cate_id":"id"} cate_id是主表中的字段名，id是副表中的字段名
     * @example where：[ ["TL.view_times",">=",100], ["TR.is_show","=",1]] TL代表主表中的查询，TR代表副表中的查询
     * @example join_select： cate_id,id,views
     */
    readUnionQueryWithoutUUID: function(
      table_name,
      join_table_name,
      join_select,
      on,
      where,
      logic,
      page,
      perPage,
      funcs
    ) {
      //app_key join_model_name join_select logic model_name on page perpage s where
      let PORT, url, dataStr1, dataStr2;
      //Define User Data
      dataStr1 = JSON.stringify(where);
      dataStr2 = JSON.stringify(on);
      //Define Post Data
      PORT = API_OBJ.TABLE_UNION_QUERY;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr1}&page=${page}&perpage=${perPage}&model_name=${table_name}&join_model_name=${join_table_name}&join_select=${join_select}&on=${dataStr2}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 使用UUID和Order来进行联合查询
     * @param table_name
     * @param join_table_name
     * @param join_select
     * @param on
     * @param where
     * @param logic
     * @param page
     * @param perPage
     * @param order
     * @param uuid
     * @param funcs
     * @example on：
     * {"cate_id":"id"} cate_id是主表中的字段名，id是副表中的字段名
     * @example where：
     * [ ["TL.view_times",">=",100], ["TR.is_show","=",1]] TL代表主表中的查询，TR代表副表中的查询
     * @example join_select：
     * cate_id,id,views
     * @example order：
     * 每一组排序格式为："字段名 + 空格 + ASC|DESC"，其中：
     * ASC：为指定列按升序排列
     * DESC：为指定列按降序排列。
     */
    readUnionQueryWithUUID_Order: function(
      table_name,
      join_table_name,
      join_select,
      on,
      where,
      logic,
      page,
      perPage,
      uuid,
      order,
      funcs
    ) {
      //app_key join_model_name join_select logic model_name on order page perpage s uuid where
      let PORT, url, dataStr1, dataStr2, dataStr3;
      //Define User Data
      dataStr1 = JSON.stringify(where);
      dataStr2 = JSON.stringify(on);
      dataStr3 = JSON.stringify(order);
      //Define Post Data
      PORT = API_OBJ.TABLE_UNION_QUERY;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr1}&page=${page}&perpage=${perPage}&model_name=${table_name}&uuid=${uuid}&order=${dataStr3}&join_model_name=${join_table_name}&join_select=${join_select}&on=${dataStr2}`;
      //Execute Post
      hGet(url, funcs);
    },
    /**
     * 使用UUID和Order,Token来进行联合查询
     * @param table_name
     * @param join_table_name
     * @param join_select
     * @param on
     * @param where
     * @param logic
     * @param page
     * @param perPage
     * @param order
     * @param uuid
     * @param token
     * @param funcs
     * @example on：
     * {"cate_id":"id"} cate_id是主表中的字段名，id是副表中的字段名
     * @example where：
     * [ ["TL.view_times",">=",100], ["TR.is_show","=",1]] TL代表主表中的查询，TR代表副表中的查询
     * @example join_select：
     * cate_id,id,views
     * @example order：
     * 每一组排序格式为："字段名 + 空格 + ASC|DESC"，其中：
     * ASC：为指定列按升序排列
     * DESC：为指定列按降序排列。
     */
    readUnionQueryWithUUID_Order_T: function(
      table_name,
      join_table_name,
      join_select,
      on,
      where,
      logic,
      page,
      perPage,
      uuid,
      order,
      token,
      funcs
    ) {
      //app_key join_model_name join_select logic model_name on order page perpage s token uuid where
      let PORT, url, dataStr1, dataStr2, dataStr3;
      //Define User Data
      dataStr1 = JSON.stringify(where);
      dataStr2 = JSON.stringify(on);
      dataStr3 = JSON.stringify(order);
      //Define Post Data
      PORT = API_OBJ.TABLE_UNION_QUERY;
      url =
        PREFIX +
        PORT +
        `&logic=${logic}&where=${dataStr1}&page=${page}&perpage=${perPage}&model_name=${table_name}&uuid=${uuid}&token=${token}&order=${dataStr3}&join_model_name=${join_table_name}&join_select=${join_select}&on=${dataStr2}`;
      //Execute Post
      hGet(url, funcs);
    },

    /**
     * 使用条件查询更新一条数据
     * @param table_name string
     * @param data {a:23123, app:"list"}
     * @param where [["a","=","3142"],[...],...]
     * @param logic "and"/"or"
     * @param uuid string
     * @param funcs
     */
    update: function(table_name, data, where, logic, uuid, funcs) {
      //app_key data logic model_name s uuid where
      let PORT, url;
      let whereStr, dataStr;
      //Define User Data
      whereStr = JSON.stringify(where);
      dataStr = JSON.stringify(data);
      //Define Post Data
      PORT = API_OBJ.TABLE_UPDATE_WHERE;
      url =
        PREFIX +
        PORT +
        `&data=${dataStr}&logic=${logic}&where=${whereStr}&uuid=${uuid}&model_name=${table_name}`;
      //Execute Post
      hGet(url, funcs);
    }
  }
};

export default yesapi;
