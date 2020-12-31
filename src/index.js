import React, { PropTypes, Component } from 'react'
import './index.css'
class TransitionComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShow: false,
            isShowDom: false,
            children: null
        }
        this.transitionEnd = this.whichTransitionEvent();
    }

    componentDidMount(){
        this.listenTransitionEvent();
        if( this.props.children ){
            //默认展示
            this.listenTransition(true, this.props.children)
        }
    }

    shouldComponentUpdate(props){
        if( !props.children && this.props.children !== props.children ){
            //两次传入props不一致，且没有children，执行淡出动画
            this.listenTransition(false)
            return false;
        }
        if( props.children && !this.props.children ){
            //之前没有children，当前有children，执行载入动画
            this.listenTransition(true, props.children)
            return false;
        }
        if( this.props.children !== props.children && props.children ){
            this.setState({
                children: props.children
            })
        }
        return true;
    }

    componentWillUnmount(){
        this.listenTransitionEvent(true);
    }

    listenTransitionEvent = ( isRemove ) => {
        if(!this.transitionDom){
            return
        }
        if( isRemove ){
            this.transitionDom.removeEventListener(this.transitionEnd, this.transitionEndOperation);
            return;
        }
        this.transitionDom.addEventListener( this.transitionEnd, this.transitionEndOperation);
    }

    listenTransition = ( isIn, children ) => {
        setTimeout(() => {
            let newState = {}
            if( isIn ){
                newState.isShow = true;
                newState.isShowDom = true;
                newState.children = children;
            }else{
                newState.isShow = false;
            }
            this.setState(newState);
        }, 0)
    }

    transitionEndOperation = (e) => {
        //isShow是动画，结束动画 比删除操作早，需要在动画结束后，执行删除
        if( this.transitionDom !== e.target ){
            return;
        }
        let { isShow, isShowDom } = this.state;
        if( isShow === isShowDom ){
            return;
        }
        this.setState({
            isShowDom: isShow,
            children: null,
        })
    }

    whichTransitionEvent = () => {
        let t;
        let el = document.createElement('fakeelement');
        let transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd',
            'MsTransition':'msTransitionEnd'
        }
    
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
        return void 0
    }
    render() {
        const { isShow, isShowDom, children }  = this.state,
              { endClassName = "default-transition", initClassName = "free-transition-static" } = this.props;
        return (
            <div className={`free-transition ${ initClassName } ${ isShow? endClassName: '' }`}
                 ref={ref=>this.transitionDom=ref}>
                { isShowDom && children}
            </div>
        );
    }
}

export default TransitionComponent
