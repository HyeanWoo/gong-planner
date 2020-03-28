import React, { Component } from 'react'
import * as subFunctions from '../firebase/subjectFuntion';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import TodoAdd from './Modals/TodoAddModal';
import TodoEditModal from './Modals/TodoEditModal';
import SubjectEditModal from './Modals/SubjectEditModal';

class EditSubjectList extends Component {
  state = {
    subjects : null,
    colName : "testSubject"
  }

  // addSubjects(subjectName, subjectColor) {
  //   const subject = {
      
  //   }
  // }

  // addTodo(subjectId, todoName, todoCheck) {
  //   let todo = {id: "99", todoName: todoName, todoCheck: todoCheck};
  //   this.setState({

  //   })
  // }

  async getSubjects(date) {
    // console.log(this.props.match.params.colName);
    const subjects = await subFunctions.getData(this.state.colName, date);
    this.setState({
      subjects
    })
  }

  componentDidMount() {
    this.getSubjects("99.99.99");
  }

  makeSubList() {
    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360
      },
      subject: {
        backgroundColor: 'orange'
      },
      nested: {
        paddingLeft: theme.spacing(4),
        backgroundColor: '#FED8B1',
        color: 'black'
      }
    }));
    
    const list = this.state.subjects ? (
      Object.keys(this.state.subjects).map( key => {
        return (
          <React.Fragment key={key}>
            <ListItem className={classes.subject}>
              <ListItemIcon>
                <FolderIcon style={{ color: this.state.subjects[key].subjectColor }} />
              </ListItemIcon>
              <ListItemText primary={this.state.subjects[key].subjectName}/>
              <SubjectEditModal subject={this.state.subjects[key]}/>
            </ListItem>
            <Collapse in={true} timeout='auto' unmountOnExit>
              {this.state.subjects[key].todos.map((todo) => {
                return (
                  <List component='div' disablePadding key={todo.id}>
                    <ListItem className={classes.nested}>
                      <ListItemText primary={todo.todoCheck} />
                      <ListItemText primary={todo.todoName} />
                      <TodoEditModal/>
                    </ListItem>
                  </List>
                );
              })}
              <TodoAdd subjectId={key} addTodo={this.addTodo}/>
            </Collapse>
          </React.Fragment>
        )
      })
    ) : (
      <div>과목을 추가해주세요!</div>
    );

    return list;
  }

  render() {
    const subList = this.makeSubList();
    return(
      <div className="col s4 offset-s4">
        {subList}
      </div>
    );
  }
}

export default EditSubjectList;