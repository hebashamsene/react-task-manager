import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/CheckCircle';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useContext} from 'react';
import { useTodos, useTodosDispatch } from '../contexts/TodosContext';
import { ToastContext } from '../contexts/ToastContext';

export default function Todo({todo,showDelete,showUpdate}) {
    const dispatch= useTodosDispatch();
    const {showHideToast}=useContext(ToastContext);
    const todos=useTodos();

    function handleCheckClick(){
        dispatch({type:"toggleCompleted",payload:todo})
        showHideToast("تم التعديل بنجاح");
    };
    function handleDeleteClick(){
       showDelete(todo);
    };
    function handleUpdateClick(){
        showUpdate(todo);
    }
    return(
        <>
            <Card className='todoCard'
               sx={{ 
                  minWidth: 275,
                  backgroundColor:"#283593",
                  marginTop:"30px",
                  color: 'white' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 8 }}>
                          <Typography variant='h5' 
                               sx={{textAlign:"right",
                               textDecoration: todo.isCompleted ? "line-through" : "none"}}>
                            {todo.title}
                          </Typography>

                           <Typography variant='h6' sx={{textAlign:"right"}}>
                            {todo.description}
                          </Typography>
                        </Grid>
                        {/* Action Button For Card */}
                        <Grid size={{ xs: 4 }} sx={{display:"flex",justifyContent:"space-around"}}>
                               {/*check icon */}
                           <IconButton onClick={()=>{
                                   handleCheckClick()
                                    }}
                                    className='iconButton'  style={{
                                    color:todo.isCompleted ? "white" : "#8bc34a",
                                    backgroundColor:todo.isCompleted ? "#8bc34a" : "white",
                                    border:"solid #8bc34a 3px",
                                    }} >
                                <CheckIcon/>
                            </IconButton>
                                {/* Update Button */}
                             <IconButton className='iconButton'  style={{
                                    color:"#1769aa",
                                    backgroundColor:"white",
                                    border:"solid #1769aa 3px",
                                    borderRadius:"50%"}} 
                                    onClick={handleUpdateClick}>
                                <EditCalendarOutlinedIcon/>
                            </IconButton>
                             {/* ===Update Button=== */}
                                {/* Delete Button */}
                             <IconButton className='iconButton'   style={{
                                    color:"#b23b3b",
                                    backgroundColor:"white",
                                    border:"solid #b23b3b 3px",
                                    borderRadius:"50%"}} 
                                    onClick={handleDeleteClick}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                            {/*== Delete Button == */}
                        </Grid>
                        {/* ==Action Button For Card ==*/}
                    </Grid>
                    
                </CardContent>
            </Card>
        </>
    )
}