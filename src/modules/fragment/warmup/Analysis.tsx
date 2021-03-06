import * as React from "react";
import { connect } from "react-redux";
import "./WarmUp.less";
import { loadWarmUpAnalysis, loadWarmUpDiscuss, discuss, deleteComment } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import Discuss from "../components/Discuss";
import DiscussShow from "../components/DiscussShow";
import SubDiscussShow from "../components/SubDiscussShow";
import _ from "lodash"
import { mark } from "../../../utils/request"
import { BreadCrumbs, TitleBar } from "../commons/FragmentComponent";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export default class Analysis extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      showDiscuss: false,
      showSelfDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      pageIndex: 1,
      integrated: false,
      isReply: false,
      placeholder: '解答同学的提问（限1000字）',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(newProps) {
    if(this.props.location.query.practicePlanId !== newProps.location.query.practicePlanId) {
      this.componentWillMount(newProps)
    }
  }

  componentWillMount(props) {
    mark({ module: "打点", function: "RISE", action: "PC打开选择题解析页", memo: "PC" });
    const { dispatch, location } = props || this.props
    this.setState({ currentIndex: 0 })
    const { practicePlanId, integrated } = location.query
    this.setState({ integrated })
    dispatch(startLoad())
    loadWarmUpAnalysis(practicePlanId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) this.setState({ list: msg, practiceCount: msg.practice.length })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  next() {
    const { currentIndex, practiceCount } = this.state
    if(currentIndex < practiceCount - 1) {
      this.setState({ currentIndex: currentIndex + 1 })
    }
  }

  prev() {
    const { currentIndex } = this.state
    if(currentIndex > 0) {
      this.setState({ currentIndex: currentIndex - 1 })
    }
  }

  nextTask() {
    const { series, planId } = this.props.location.query
    this.context.router.push({
      pathname: '/fragment/learn',
      query: { series, planId }
    })
  }

  closeDiscussModal() {
    const { dispatch } = this.props
    let { list, currentIndex } = this.state
    const { practice = [] } = list
    const { id } = practice[ currentIndex ]

    loadWarmUpDiscuss(id, 1).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        _.set(list, `practice.${currentIndex}.discussList`, msg)
        this.setState({ showDiscuss: false, showSelfDiscuss: false, list })
        document.body.scrollTop = document.querySelector(".discuss").offsetTop
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  reply(item) {
    this.setState({
      showDiscuss: true,
      isReply: true,
      placeholder: '回复 ' + item.name + ':',
      content: '',
      repliedId: item.id,
      referenceId: item.warmupPracticeId
    })
  }

  onChange(value) {
    this.setState({ content: value })
  }

  cancel() {
    this.setState({ placeholder: '解答同学的提问（限1000字）', isReply: false, showDiscuss: false, showSelfDiscuss: false })
  }

  onSubmit(isSelfDiscuss = false) {
    const { dispatch } = this.props;
    const { content, list, currentIndex } = this.state;
    // 针对回复框类型，选择评论类型，是否回复
    const repliedId = isSelfDiscuss ? 0 : this.state.repliedId;
    const { practice = [] } = list;
    const { id } = practice[ currentIndex ];
    if(content.length == 0) {
      dispatch(alertMsg('请填写评论'));
      return false;
    }

    let discussBody = { comment: content, referenceId: id };
    if(repliedId) {
      _.merge(discussBody, { repliedId: repliedId })
    }

    discuss(discussBody).then(res => {
      const { code, msg } = res;
      if(code === 200) {
        this.closeDiscussModal()
      }
      else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    });

    return true;
  }

  onDelete(discussId) {
    const { dispatch } = this.props

    deleteComment(discussId).then(res => {
      let { list, currentIndex } = this.state
      const { practice = [] } = list
      const { id } = practice[ currentIndex ]

      loadWarmUpDiscuss(id, 1).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if(code === 200) {
          _.set(list, `practice.${currentIndex}.discussList`, msg)
          this.setState({ showDiscuss: false, list })
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    })
  }

  openWriteBox() {
    this.setState({
      showSelfDiscuss: true,
      content: '',
      isReply: false,
      repliedId: 0,
      placeholder: '和作者切磋讨论一下吧'
    }, () => {
      document.body.scrollTop = document.body.scrollHeight;
    })
  }

  render() {
    const {
      list, currentIndex, selected, practiceCount, showDiscuss, isReply, integrated, placeholder
    } = this.state
    const { practice = [] } = list

    const questionRender = (practice) => {
      const { id, question, pic, choiceList = [], score = 0, discussList = [], knowledgeId } = practice;
      return (
        <div>
          <div className="intro-container">
            { practiceCount !== 0 && currentIndex <= practiceCount - 1 ?
              <div className="intro-index">
                <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
                <span className="type"><span className="number">{score}</span>分</span>
              </div> : null}
            {pic ? <div className="context-img">
                <AssetImg url={pic}/></div> : null
            }
            <div className="question">
              <div dangerouslySetInnerHTML={{ __html: question }}/>
            </div>
            <div className="choice-list">
              {choiceList.map((choice, idx) => choiceRender(choice, idx))}
            </div>
            <div className="analysis">
              {<TitleBar content="解析"/>}
              <div className="context" style={{ marginTop: 10 }}>
                正确答案：{choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
              </div>
              <div className="context" style={{ marginBottom: 15 }}>
                已选答案：{choiceList.map((choice, idx) => myAnswerRender(choice, idx))}
              </div>
              <div className="context"
                   dangerouslySetInnerHTML={{ __html: practice ? practice.analysis : '' }}/>
              {integrated == 'false' ?
                <div className="knowledge-link click-key"
                     onClick={() =>
                       window.open(`/fragment/knowledge?id=${knowledgeId}&tag=${false}`)
                     }>
                  点击查看相关知识</div> : null
              }
            </div>
          </div>
          {renderClickBtn()}
          <div className="discuss-container">
            <div className="discuss">
              <TitleBar content="问答"/>
              {renderSelfDiscuss()}
              {discussList.map((discuss, idx) => discussRender(discuss, idx))}
              { discussList.length > 0 ?
                <div className="show-more">
                  你已经浏览完所有的讨论啦
                </div>
                :
                <div className="discuss-end">
                  <div className="discuss-end-img">
                    <AssetImg url="https://static.iqycamp.com/images/no_comment.png" width={94} height={92}/>
                  </div>
                  <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>
                </div>
              }
            </div>
          </div>
        </div>
      )
    }

    const discussRender = (comment, idx) => {
      const { warmupPracticeDiscussList } = comment
      return (
        <div key={idx}>
          <DiscussShow
            key={idx} discuss={comment} reply={() => this.reply(comment)}
            onDelete={()=>this.onDelete(comment.id)}/>
          {
            this.state.showDiscuss && this.state.repliedId === comment.id ?
              <Discuss
                isReply={isReply} placeholder={placeholder}
                submit={() => this.onSubmit()} limit={1000}
                onChange={(v) => this.onChange(v)}
                cancel={() => this.cancel()}/> :
              null
          }
          {!_.isEmpty(warmupPracticeDiscussList) ?
            <div>
              <div className="discuss-triangle"></div>
              {warmupPracticeDiscussList.map((discuss, idx) => subDiscussRender(discuss, idx))}
              <div className="discuss-padding"></div>
            </div>
            : null}
        </div>
      )
    }

    const subDiscussRender = (discuss, idx) => {
      return (
        <div key={idx}>
          <SubDiscussShow discuss={discuss} showLength={50} reply={()=>this.reply(discuss)}
                          onDelete={()=>this.onDelete(discuss.id)}/>
          {
            this.state.showDiscuss && this.state.repliedId === discuss.id ?
              <div className="sub-discuss-reply">
                <Discuss
                  isReply={isReply} placeholder={placeholder}
                  submit={() => this.onSubmit()} limit={1000}
                  onChange={(v) => this.onChange(v)}
                  cancel={() => this.cancel()}/>
              </div>  :
              null
          }
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id}
             className={`hover-cursor choice${choice.selected ? ' selected' : ''}${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {choice.isRight ? <AssetImg type="right" width={13} height={8}/> : sequenceMap[ idx ]}
          </span>
          <span className={`text`}>{subject}</span>
        </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[ idx ] + ' ' : '')
    }

    const myAnswerRender = (choice, idx) => {
      return (choice.selected ? sequenceMap[ idx ] + ' ' : '')
    }

    const renderClickBtn = () => {
      return (
        <div>
          <div className="button-footer">
            <div className={`left ${currentIndex === 0 ? ' disabled' : 'origin'}`}
                 onClick={()=>this.prev()}>上一题
            </div>
            {currentIndex + 1 < practiceCount ?
              <div className={`right`} onClick={()=>this.next()}>下一题</div> :
              <div className={`right`} onClick={()=>this.nextTask()}>返回</div>}
          </div>
        </div>
      )
    }

    const renderSelfDiscuss = () => {
      if(!showDiscuss) {
        return (
          <div>
            <Discuss
              isReply={isReply} placeholder={`解答同学的提问（限1000字）`}
              submit={() => this.onSubmit(true)} limit={1000}
              onChange={(v) => this.onChange(v)}
              cancel={() => this.cancel()}
              showCancelBtn={false}
            />
          </div>
        )
      }
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up">
            <div className="warm-up-head">
              <BreadCrumbs level={1} name={`选择题`}/>
              {practice[ currentIndex ] && practice[ currentIndex ].knowledge ?
                <div className="page-header">{practice[ currentIndex ].knowledge.knowledge}</div> :
                <div className="page-header">综合练习</div>
              }
            </div>
            {questionRender(practice[ currentIndex ] || {})}
          </div>
          {showDiscuss ? <div className="padding-comment-dialog"/> : null}
        </div>
      </div>
    )
  }
}
