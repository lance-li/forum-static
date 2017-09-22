import * as React from "react";
import './ProblemSelector.less'
import _ from "lodash"
import { SelectField, MenuItem } from 'material-ui'
import { loadSimpleProblems } from "../problem/async"

export class ProblemSelector extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: [],
      targetProblem:{}
    }

  }

  componentWillMount() {
    loadSimpleProblems().then(res => {
      if(res.code === 200) {
        this.setState({ data: res.msg })
      }
    })
  }

  getValue(){
    const { targetProblem } = this.state
    return targetProblem.id
  }

  render() {
    const { data, targetProblem } = this.state

    return (
      <div className="problem-selector">
        <SelectField
          value={targetProblem}
          floatingLabelText="选择小课"
          onChange={(e, idx, value) => this.setState({ targetProblem: value})}
        >
          {
            data.map((problem, idx) => {
              return (
                <MenuItem key={idx} value={problem} primaryText={problem.problem}/>
              )
            })
          }
        </SelectField>
      </div>
    )
  }
}
