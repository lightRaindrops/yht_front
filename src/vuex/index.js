import mutations from './mutations.js';
import * as actions from './actions';

const state = {
  login: '',
  errorMsg: '', //错误信息
  userInfo: [],
  userSignup: [],
  loginResult: '',
  AuthUpdatePasswd: {},
  navigation:[], //导航
  groups:[],//功能组
  update_permission: false,
  updateIconCssFile: '',
  functionTableData: [], //表格数据
  functionTablePageCount: 1, //表格数据分页
  add_group: '',
  role_table_data: [],
  roleTreeData: [],//权限分配项
  roleAdd: '',
  tree_select: [],
  updateRoleStatus: '',
  role_info: [], //角色信息
  role_put_status: '',
  userList: [],
  userRole: [],
  updateUserAuthorize: '',
  user_put_role_status: '',
  createBrandStatus: false, //品牌的创建状态 
  updateBrandStatus: false, //品牌的更新状态 
  updateBrandEnableStatus: false,
  brandList: [],
  iconUrl: '',
  region: [],
  customerCreate: '',
  customerList: [],
  receiveStatus: '',
  personal_customer_list: [],
  append_comments: '',
  comments: [],
  freeCustomer: '',
  acceptCustomer: '',
  customerManagerList: [],
  customerPublish: [],
  department_list: [],
  departmentStaff: [],
  departmentSetStaff: [],
  departmentSetManager: [],
  customerInit: [],
  syncUser: [],
  initUserList: [],
  joinWorkWx: [],
  baseMobileData: [],
  createChat: [],
  CurrentCustomer: [],
  ArticlePost: [],
  article: [],
  ArticleCategory: [],
  ArticleCategoryPost: [],
  ArticleOne: [],
  AddArticleAnswer: {},
  ArticleAnswer: {},
  ArticleAgree: '',
  ForumMenu: {},
  ArticleDraft: {},
  ArticlePublish: {},
  ArticleEditOne: {},
  ArticleUpdate: {},
  ArticlePublishList: {},
  ArticleCategoryPut: {},
  ArticleSetFine: {},
  ArticleDelete: {},
  ArticleAgreeNotify: {},
  ArticleAnswerNotify: {},
  ArticleAgreeList: [],
  AgreeEveryMonth: [],
  MyArticleNotify: {},
  historyMenu: [],
  ShrinkStatus: false,
  Breadcrumb: [],
  DeletePermission: {},
  AddMyCustomer: {},
  SearchCust: {},
  SearchProject: {},
  AddReceivable: {},
  AddReceivebill: {},
  ARSum: [],
  ARSumLoading: true,
  ARSumTotal: 0,
  UpdateReceivable: {},
  UpdateReceivebill: {},
  AddARType: {},
  ARType: [],
  AddProject: {},
  agreementList: [],
  ARSumUserRole: {},
  BasePagination: {},
  ARSummaries: [],
  AddReceivablePlan: {},
  RefundAdd: {},
  UpdateRefund: {},
  ARCurrentTable: '',
  ARTableConfig: {
    sale:true,
    receive:false,
    balance:false,
    init: false,
    FilterVisible: false,
    CreateCustVisible: false,
    CreateProVisible: false,
    ImportVisible: false,
    SaleOrderVisible: false,
    ReceivebillVisible: false,
    RefundVisible: false,
    RecePlanVisible: false,
    ChangeCustVisible: false,
    CreatePotentialProVisible: false
  },
  ARSetFieldType: [],
  ARSumCurrentRow: {},
  AddEnumberate: {},
  Enumberate: [],
  AddBindAttr: {},
  BindAttrList: [],
  FIELDS: [],
  filterQuery: {},
  SaleOrderList: {
    data: [],
    pagination: {
      total: 0
    },
    CurrentRow: {},
    update: false,
    ready: false, //是否已经加载过
  },//销售应收列表
  ReceiveBillList: {
    data: [],
    CurrentRow: {
    },
    pagination: {
      total: 0
    },
    update: false,
    ready: false, //是否已经加载过
  }, //收款列表
  DiscountList: [], //优惠列表
  RefundList: {
    data: [],
    CurrentRow: {
    },
    pagination: {
      total: 0
    },
    update: false,
    ready: false, //是否已经加载过
  }, //退货列表
  RecePlanList: {
    data: [],
    CurrentRow: {
    },
    pagination: {
      total: 0
    },
    ready: false, //是否已经加载过
  },//收款计划列表
  CustStatus:{
    //客户状态更新
  },
  ARSumFilterTable: {},//表头过滤信息
  FindARSumFilterValue: [], //远程搜索结果
  CreateProgram: {},
  FilterProgram: [],
  UpdateFilterConfig: {}
}

export default {
	state,
	actions,
	mutations
}