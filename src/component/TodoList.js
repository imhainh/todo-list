import React from 'react';
import classNames from 'classnames';
import './TodoList.css';

import checkImg from '../img/check.svg';
import checkCompletedImg from '../img/check-active.svg';

class TodoList extends React.Component {
    render(props) {
        const { todoItem, onClick } = this.props;
        let urlImg = checkImg;
        if (todoItem.isCompleted) {
            urlImg = checkCompletedImg;
        }
        return (
            <div className={classNames('TodoList', {
                'TodoList-completed': todoItem.isCompleted
            })} >
                <img onClick={onClick} src={urlImg} alt="checkIMG" />
                <p>{todoItem.title}</p>
            </div>
        );
    }
}
// const TodoList = (props) => {
//     let { todoItem } = props;
//     let urlImg = checkImg;
//     if (todoItem.isCompleted) {
//         urlImg = checkCompletedImg;
//     }
//     return (
//         <div className={classNames('TodoList', {
//             'TodoList-completed': todoItem.isCompleted
//         })} >
//             <img onClick={props.onClick} src={urlImg} alt="checkIMG" />
//             <p>{todoItem.title}</p>
//         </div>
//     );
// }
export default TodoList;