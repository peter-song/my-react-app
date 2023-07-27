/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

function Item({ item }) {
  return (
    <div>
      <img
        src="/logo192.png"
        style={{
          width: 100,
          height: 100,
        }}
      />
      <span>{item.name}</span>
    </div>
  );
}

class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.node = React.createRef();
  }

  componentDidMount() {
    this.node.current.addEventListener('scroll', this.handleScroll);
  }

  static getDerivedStateFromProps(nextProps) {
    const { data } = nextProps;
    console.log('data :>> ', data);
    return { list: data || [] };
  }

  handleScroll = e => {
    const { scroll } = this.props;
    scroll && scroll(e);
    this.handlerScrollToLower();
  };

  handlerScrollToLower = () => {
    const { scrollToLower } = this.props;
    const {
      scrollHeight, scrollTop, offsetHeight,
    } = this.node.current;
    if (scrollHeight === scrollTop + offsetHeight) {
      scrollToLower && scrollToLower();
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.list !== nextState.list;
  }

  getSnapshotBeforeUpdate() {
    return this.node.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('scrollView容器高度变化:', this.node.current.scrollHeight - snapshot);
  }

  componentWillUnmount() {
    this.node.current.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { list } = this.state;
    const { component } = this.props;

    return (
      <div ref={this.node} style={{
        border: '1px solid',
        marginTop: 10,
        height: 300,
        overflowY: 'auto',
      }}>
        <div>
          {
            list.map(item => (
              React.createElement(component, {
                key: item.id,
                item,
              })
            ))
          }
        </div>
      </div>
    );
  }
}

const getData = params => {
  const list = [];
  for (let i = (params.page - 1) * params.limit; i < params.page * params.limit; i++) {
    list.push({
      id: i + 1,
      name: `Test${i + 1}`,
    });
  }
  return Promise.resolve({
    list,
    total: 35,
  });
};

function Index() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData({
      page,
      limit: 5,
    });
  }, [page]);

  const fetchData = params => {
    getData(params).then(res => {
      setData([...data, ...res.list]);
    });
  };

  const handleScrollToLower = () => {
    console.log('scroll到底底部');
    setPage(page + 1);
  };

  return (
    <div style={{
      border: '1px solid',
      marginTop: 10,
      height: 300,
      overflowY: 'auto',
    }}>
      <ScrollView
        data={data}
        component={Item}
        scrollToLower={handleScrollToLower}
      />
    </div>
  );
}

export default Index;
