import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Statistic, Row, Col } from 'antd';

const MemberOverview = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const requestBody = {
      query: `
        query {
          users { 
            _id
            email
            firstName
            lastName
            age
            gender
            points
            wins
            loses
            createdAt
          }
        }
      `}
    axios.post('http://localhost:5000/graphql', requestBody).then(res => setUsers(res.data.data.users)).catch(err => console.log(err));
  }, []);

  const curmonth = new Date().getMonth();
  console.log(curmonth);
  if(users.length > 1){
    const date = users[0].createdAt
    const now = new Date(parseInt(date));
    console.log(date);
    console.log(now)
  }


  // const newUsersMonth = users.reduce((acc, cur) => {
  //   const curmonth = new Date().getMonth();
  //   if( cur.createdAt.getMonth() === curmonth) {
  //     acc++;
  //   }
  //   return acc;
  // }, 0);

  return (
    <div>
      <Row>
        <Col span={12}>
          <Statistic title='Active Users' value={users.length} />
        </Col>
        <Col span={12}>
          <Statistic title={`New Users in ${curmonth}`} value={1}/>
        </Col>
      </Row>
    </div>
  )
}

export default MemberOverview;
