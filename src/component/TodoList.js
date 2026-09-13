import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { ToastContext } from '../contexts/ToastContext';
import todosReducer from '../reducers/todosReducer';
import { useTodos,useTodosDispatch } from '../contexts/TodosContext';

export default function TodoList() {

    const todos=useTodos();
    const dispatch=useTodosDispatch();


    const { showHideToast } = useContext(ToastContext);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [disPlayTodosType, setDisPlayTodosType] = useState("all");
    
    // حالة المهمة المحددة للحذف أو التعديل
    const [dialogTodo, setDialogTodo] = useState(null);
    const [updatedTodo, setUpdatedTodo] = useState({ id: "", title: "", description: "" });
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);


    useEffect(()=>{
        dispatch({type:"get"});
    },[]);

    function changeDisPlayType(e) {
        setDisPlayTodosType(e.target.value);
    }

    // تصفية المهام
    const completedTodos = useMemo(() => {
        return todos.filter((t) => t.isCompleted);
    }, [todos]);

    const nonCompletedTodos = useMemo(() => {
        return todos.filter((t) => !t.isCompleted);
    }, [todos]);

    let todosToBeRendered = todos;
    if (disPlayTodosType === "completed") {
        todosToBeRendered = completedTodos;
    } else if (disPlayTodosType === "non-completed") {
        todosToBeRendered = nonCompletedTodos;
    }

    const todoJsx = todosToBeRendered.map((todo) => {
        return (
            <Todo key={todo.id} 
                todo={todo} 
                showDelete={showDeletingDialog} 
                showUpdate={openUpdateDialog} />
        );
    });

    function handleAddClick() {
        dispatch({ type: "added", payload: { newTitle: titleInput } });
        setTitleInput("");
        showHideToast("تمت الإضافة بنجاح");
    }

    // فتح نافذة الحذف
    function showDeletingDialog(todo) {
        setDialogTodo(todo);
        setShowDeleteDialog(true);
    }

    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }

    function handleDeleteConfirm() {
        dispatch({ type: "deleted", payload: dialogTodo });
        setShowDeleteDialog(false);
        showHideToast("تم الحذف بنجاح");
    }

    // فتح نافذة التعديل وتعبئة البيانات الحالية
    function openUpdateDialog(todo) {
        setDialogTodo(todo);
        setUpdatedTodo({ id: todo.id, title: todo.title, description: todo.description || "" });
        setShowUpdateDialog(true);
    }

    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }

    function handleUpdateConfirm() {
        dispatch({ type: "updated", payload: updatedTodo });
        setShowUpdateDialog(false);
        showHideToast("تم التحديث بنجاح");
    }

    return (
        <>
            {/* نافذة التعديل */}
            <Dialog
                style={{ direction: "rtl" }}
                onClose={handleUpdateClose}
                open={showUpdateDialog}
                role="alertdialog"
            >
                <DialogTitle style={{ fontSize: "30px" }}>تعديل المهمة</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="عنوان المهمة"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) => {
                            setUpdatedTodo({ ...updatedTodo, title: e.target.value });
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="تفاصيل المهمة"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.description}
                        onChange={(e) => {
                            setUpdatedTodo({ ...updatedTodo, description: e.target.value });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: "18px" }} onClick={handleUpdateClose}>إغلاق</Button>
                    <Button style={{ fontSize: "18px" }} onClick={handleUpdateConfirm}>تأكيد</Button>
                </DialogActions>
            </Dialog>

            {/* نافذة الحذف */}
            <Dialog
                style={{ direction: "rtl" }}
                onClose={handleDeleteDialogClose}
                open={showDeleteDialog}
                role="alertdialog"
            >
                <DialogTitle style={{ fontSize: "25px" }}>
                    هل أنت متأكد من حذف المهمة ؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: "18px" }}>
                        لا يمكن التراجع عن هذا الحذف
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: "18px" }} onClick={handleDeleteDialogClose}>إغلاق</Button>
                    <Button style={{ fontSize: "18px" }} onClick={handleDeleteConfirm}>نعم قم بالحذف</Button>
                </DialogActions>
            </Dialog>

            {/* الواجهة الرئيسية */}
            <Container maxWidth="sm">
                <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <CardContent>
                        <Typography variant='h3' gutterBottom sx={{ color: 'text.secondary', textAlign: 'center' }}>
                            مهامي
                        </Typography>
                        <Divider />
                        
                        <ToggleButtonGroup
                            style={{ direction: "ltr", marginTop: "20px", display: "flex", justifyContent: "center" }}
                            value={disPlayTodosType}
                            exclusive
                            onChange={changeDisPlayType}
                            color='primary'
                        >
                            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
                            <ToggleButton value="completed">المنجز</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>

                        {todoJsx}

                       {/* input & add button */}
                <Grid container style={{ marginTop: "30px" }} spacing={2}>
                    <Grid 
                        spacing={2}
                        size={{ xs: 8 }}
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="عنوان المهمة" 
                            variant="outlined"
                            style={{ width: "100%" }} 
                            value={titleInput}
                            onChange={(e) => {
                                setTitleInput(e.target.value);
                            }}
                        />
                    </Grid>

                        <Grid 
                            spacing={2}
                            size={{ xs: 4 }}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button 
                                variant="contained" 
                                style={{ width: "100%", height: "100%" }}
                                onClick={handleAddClick}
                                disabled={titleInput.length === 0}
                            >
                                إضافة
                            </Button>
                        </Grid>
                    </Grid>
                    {/*== input & add button ==*/}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}