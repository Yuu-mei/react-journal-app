import { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import { startDeletingNote } from '../../store/auth';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(newDate);
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
      if(messageSaved.length > 0){
        Swal.fire('Updated note', messageSaved, 'success');
      }
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch(startSavingNote());
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }
    

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center"
        sx={{ mb: 1 }} className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight="light" >{dateString}</Typography>
            </Grid>

            <Grid item>
                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button color="primary" sx={{ p: 2 }}
                onClick={onSaveNote} disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Insert the title"
                    label="Title"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿What happened today?"
                    label="Entry body"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline /> Delete
                </Button>
            </Grid>

            <ImageGallery
                images={activeNote.imageUrls}
            />
        </Grid>
    );
}
