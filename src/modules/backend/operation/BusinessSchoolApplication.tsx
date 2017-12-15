import * as React from "react";
import { connect } from "react-redux";
import { set, startLoad, endLoad, alertMsg } from "../../../redux/actions"
import "./BusinessSchoolApplication.less";
import { loadBusinessApplicationList, rejectBusinessApplication, approveBusinessApplication, ignoreBusinessApplication } from "./async"
import * as _ from "lodash";
import { MessageTable } from '../message/autoreply/MessageTable'
import { RaisedButton, TextField, Toggle, Dialog, Divider, SelectField, MenuItem } from 'material-ui'
import Confirm from '../../../components/Confirm'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0,
}
@connect(state => state)
export default class BusinessSchoolApplication extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickname', alias: '昵称', style: cellStyle },
        { tag: 'verifiedResult', alias: '最近审核结果', style: _.merge({}, cellStyle, { width: '85px' }) },
        { tag: 'isAsst', alias: '助教', style: _.merge({}, cellStyle, { width: '35px' }) },
        { tag: 'reward', alias: '优秀学员' },
        { tag: 'isBlack', alias: '黑名单' },
        { tag: 'originMemberTypeName', alias: '原本会员类型', style: cellStyle },
        { tag: 'finalPayStatus', alias: '最终付费情况', style: cellStyle },
        // { tag: 'coupon', alias: '优惠券', style: cellStyle },
        // { tag: 'checkTime', alias: '审核时间', style: cellStyle },
        // { tag: 'deal', alias: '已处理', style: cellStyle, style: _.merge({}, cellStyle, { width: '50px' }) },
        { tag: 'submitTime', alias: '问卷提交时间', style: cellStyle },
      ],
      data: [],
      openDialog: false,
      showCouponChoose: false,
      coupon: 0,
      showNoticeRejectModal: false,
      RasiedClicked:false,
      noticeRejectModal: {
        title: '提示',
        content: '是否拒绝,将进行退款操作',
        actions: [ {
          label: '确认',
          onClick: () => {
            this.setState({ showNoticeRejectModal: false });
            this.handleClickRejectApplication();
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showNoticeRejectModal: false })
          }
        ]
      }
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(startLoad());
    loadBusinessApplicationList(1).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, tablePage: res.msg.page });
      } else {
        dispatch(alertMsg(res.smg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  openDialog(data) {
    this.setState({
      openDialog: true,
      editData: data
    })
  }

  handleChangeCoupon(event, index, value) {
    this.setState({ coupon: value });
  }

  handleClickRejectApplicationBtn() {
    const {comment} = this.state
    const {dispatch} = this.props
    if(comment === undefined || comment === ''){
      dispatch(alertMsg('请输入面试评价'))
      return
    }
    this.setState({
      RasiedClicked:true,
      showNoticeRejectModal: true });
  }

  handleClickRejectApplication() {
    const { openDialog, editData = {}, showCouponChoose, coupon, comment } = this.state;
    const { dispatch } = this.props;
    dispatch(startLoad());
    rejectBusinessApplication(editData.id, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  checkCommentedApproval(){
    const {comment} = this.state
    const{dispatch} = this.props

    if(comment === undefined || comment === ''){
      dispatch(alertMsg('请输入面试评价'))
      return
    }

    this.setState({
      RasiedClicked:true,
      showCouponChoose: true
    })
  }

  handleClickApprove(data, coupon, comment) {
    const { dispatch } = this.props;

    dispatch(startLoad());
    approveBusinessApplication(data.id, coupon, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  handleClickIgnoreApplication(data, comment) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    ignoreBusinessApplication(data.id, comment).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.refreshPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  refreshPage() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      showCouponChoose: false,
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadBusinessApplicationList(page).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, RasiedClicked:false,tablePage: res.msg.page, page: page });
      } else {
        dispatch(alertMsg(res.smg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  handleClickClose() {
    this.setState({
      openDialog: false,
      editData: undefined,
      coupon: 0,
      comment: undefined,
      showCouponChoose: false,
    })
  }

  render() {
    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}

          <span className={`${(value == '是' && label == '是否黑名单用户：') ? "bs-dialog-true-value" : "bs-dialog-value"}`}>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }
    const renderDialog = () => {
      const { openDialog, editData = {}, showCouponChoose, coupon, comment,RasiedClicked } = this.state;
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              申请者信息：
            </div>
            {renderDialogItem("昵称：", editData.nickname)}
            {renderDialogItem("OpenId：", editData.openid)}
            {renderDialogItem("当前会员状态：", editData.memberType)}
            {renderDialogItem("付费状态：", editData.finalPayStatus)}
            {renderDialogItem("申请时会员类型：", editData.originMemberTypeName)}
            {renderDialogItem("是否助教：", editData.isAsst)}
            {renderDialogItem("最近审核结果：", editData.verifiedResult)}
            {renderDialogItem("是否黑名单用户：", editData.isBlack)}
            {renderDialogItem("最终付费状态：", editData.finalPayStatus)}
            <div className="bs-dialog-header">
              问卷信息：
            </div>
            {editData.questionList ? editData.questionList.map(item => {
              return renderDialogItem(item.question, item.answer, true, item.id)
            }) : null}
            <div className="bs-dialog-header">
              审批：
            </div>
            <br/>
            输入面试评价（必填）：<br/>
            <textarea
              placeholder="面试评价"
              value={comment}
              className="comment-text"
              onChange={(e) => this.setState({ comment: e.target.value })}
            /><br/>
            {
              RasiedClicked ? null:
              <div ref="raisedButton">
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="通过" secondary={true} disabled={editData.isBlack}
                  onClick={() => {
                    this.checkCommentedApproval()
                  }}/>
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="拒绝" secondary={true}
                  onClick={() => this.handleClickRejectApplicationBtn(editData, comment)}/>
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="私信" secondary={true}
                  onClick={() => this.handleClickIgnoreApplication(editData, comment)}/>
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="取消" secondary={true}
                  onClick={() => this.handleClickClose()}/>
              </div>
            }

            {
              showCouponChoose ?
                <div className="bs-dialog-coupon">
                  <SelectField
                    floatingLabelText="请选择优惠券"
                    value={coupon}
                    onChange={(event, index, value) => this.handleChangeCoupon(event, index, value)}
                  >
                    <MenuItem value={0} primaryText="无"/>
                    <MenuItem value={200} primaryText="200"/>
                    <MenuItem value={300} primaryText="300"/>
                    <MenuItem value={400} primaryText="400"/>
                    <MenuItem value={500} primaryText="500"/>
                    <MenuItem value={600} primaryText="600"/>
                    <MenuItem value={800} primaryText="800"/>
                    <MenuItem value={1540} primaryText="1540"/>
                    <MenuItem value={3080} primaryText="3080"/>
                  </SelectField>
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="确定" primary={true}
                    onClick={() => this.handleClickApprove(editData, coupon, comment)}/>
                </div> : <div className="bs-dialog-coupon"/>
            }
          </div>
        </Dialog>
      )
    }
    return (
      <div className="bs-container">
        {renderDialog()}
        <MessageTable data={this.state.applications} meta={this.state.meta} editFunc={(item) => this.openDialog(item)}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)} opsName="审核"/>
        <Confirm open={this.state.showNoticeRejectModal} {...this.state.noticeRejectModal}
                 handlerClose={() => this.setState({ showNoticeRejectModal: false })}/>
      </div>
    )
  }
}
