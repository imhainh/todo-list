import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

//PropTypes sẽ định nghĩa và kiểm tra dữ liệu đầu vào, nếu không đúng như cài đặt thì sẽ hiện cảnh báo ở console.
//PropTypes chỉ hoạt động ở development mode
// Chi tiết thêm: https://vi.reactjs.org/docs/typechecking-with-proptypes.html

TodoList.propTypes = { // bắt đầu định nghĩa các data nhận vào.
    todoItem: PropTypes.shape({ // định nghĩa todoItem nhận vào là object và có cà fill như bên dưới.
        isCompleted: PropTypes.bool, // isCompleted: nhận vào 1 giá trị boolean (true, false)
        title: PropTypes.string.isRequired // title: nhận vào 1 chuỗi (String), bắt buộc (isRequired)
    }),
    onClick: PropTypes.func // onClick: nhận vào 1 function.
}

export default TodoList;