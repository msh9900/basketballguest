// classCompTest

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class classCompTest extends Component {
    render() {
        const {data, children} = this.props;

        return (
            <div>
                props 익히기=> {data} <br />
                컴포넌트 사이의 내용 => {children}
            </div>
        );
    }
}

classCompTest.defaultProps = {
    data: "기본으로 설정된 값입니다."
}

classCompTest.propTypes = {
    data: PropTypes.string.isRequired,
};

export default classCompTest;