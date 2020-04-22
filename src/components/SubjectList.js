import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import TodoHomeModal from '../components/Modals/TodoHomeModal';

import { secondToTime } from '../utils';

const SubjectList = ({ colName, date, subjects, setFold, reRenderSubject }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: 0,
      backgroundColor: 'transparent',
      color: 'black',
      boxShadow: 'none',
    },
    subjectColor: {
      minWidth: '8px',
      marginRight: '16px',
    },
    subjectText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    nested: {
      paddingLeft: theme.spacing(4),
      backgroundColor: '#EEEEEE',
      color: 'black',
      zIndex: -2,
    },
  }));
  const classes = useStyles();

  const listSubject = subjects
    ? Object.keys(subjects).map((key) => {
        return (
          <React.Fragment key={key}>
            <ListItem
              button
              onClick={() => {
                setFold(key, subjects[key].fold);
              }}
            >
              <Box
                className={classes.subjectColor}
                style={{ backgroundColor: subjects[key].subjectColor }}
              />
              <ListItemText
                className={classes.subjectText}
                primary={subjects[key].subjectName}
                secondary={secondToTime(subjects[key].totalElapsedTime)}
              />
              {subjects[key].fold ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {subjects[key].todos.map((todo) => {
              return (
                <Collapse in={subjects[key].fold} timeout='auto' unmountOnExit key={todo.id} style={{height:"auto"}}>
                  <List component='div' disablePadding>
                    <TodoHomeModal 
                      subjectId={key}
                      colName={colName}
                      date={date}
                      todo={todo}
                      reRenderSubject={reRenderSubject}
                    />
                    <ListItem className={classes.nested}>
                      <ListItemIcon>
                        {todo.todoCheck === '3' ? (
                          <ClearRoundedIcon />
                        ) : todo.todoCheck === '2' ? (
                          <CheckCircleOutlineRoundedIcon />
                        ) : todo.todoCheck === '1' ? (
                          <ChangeHistoryRoundedIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={todo.todoName} />
                    </ListItem>
                  </List>
                </Collapse>
              );
            })}
          </React.Fragment>
        );
      })
    : '리스트 비었음ㅎ';

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      className={classes.root}
    >
      {listSubject}
    </List>
  );
};

export default SubjectList;
