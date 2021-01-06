# reactComponentTransition
为react组件添加挂载/删除动画

### 如何引入
```Bash
npm i -S react-component-transition-in-out
```
### 支持传参
```javascript
    const props = {
        initClassName: 'init'       //组件动画常态值
        endClassName: 'destroy'     //组件动画初始值
    }
    <ReactComponentTransitionInOut {...props}>
        { isShow && <div>demo</div> }
    </ReatComponentTransitionInOut>
```
### 用法demo
```javascript
import React, { PropTypes, Component } from 'react'
import ReactComponentTransitionInOut from 'react-component-transition-in-out';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShow: false,
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(){
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render (){
        const { isShow } = this.state;
        return (
            <div>
                <button onClick={this.onChange}>{isShow? 'hide': 'show'}</button>
                <ReactComponentTransitionInOut>
                    { isShow && <div>demo</div> }
                </ReatComponentTransitionInOut>
            </div>
        )
    }    
}
```