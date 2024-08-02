import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

interface EditBannerProps {
    open: boolean;
    onClose: () => void;
    banner: Banner;
    onSave: (editedBanner: Banner) => void;
}

interface Banner {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
}

const predefinedTemplates = [
    { id: 1, src: '/images/template1.jpg', alt: 'Template 1' },
    { id: 2, src: '/images/template2.jpg', alt: 'Template 2' },
    { id: 3, src: '/images/template3.jpg', alt: 'Template 3' },
];

const EditBannerTemplateBs: React.FC<EditBannerProps> = ({ open, onClose, banner, onSave }) => {
    const [editedBanner, setEditedBanner] = useState<Banner>(banner);
    const [uploadedTemplates, setUploadedTemplates] = useState<{ id: number; src: string; alt: string }[]>(predefinedTemplates);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedBanner({ ...editedBanner, [name]: value });
    };

    const handleTemplateChange = (image: string) => {
        setEditedBanner({ ...editedBanner, image });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newTemplate = { id: Date.now(), src: reader.result as string, alt: 'Uploaded Template' };
                setUploadedTemplates(prev => {
                    const updatedTemplates = [newTemplate, ...prev].slice(0, 5);
                    return updatedTemplates;
                });
                setEditedBanner({ ...editedBanner, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(editedBanner);
    };

    return (
        <Modal open={open}>
            <Box sx={{ width: 400, borderRadius: 5, bgcolor: 'background.paper', p: 4, m: 'auto', mt: 10, position: 'relative' }}>
                <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <h2>Edit Banner</h2>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Box
                        component="img"
                        src={editedBanner.image}
                        alt="Banner Image"
                        sx={{ width: 300, height: 200, objectFit: 'cover', borderRadius: 1 }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, flex: 1 }}>
                        {uploadedTemplates.map((template) => (
                            <Box
                                key={template.id}
                                component="img"
                                src={template.src}
                                alt={template.alt}
                                onClick={() => handleTemplateChange(template.src)}
                                sx={{ width: 50, height: 50, cursor: 'pointer', borderRadius: '50%', border: '2px solid #ccc' }}
                            />
                        ))}
                    </Box>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Button
                            variant="contained"
                            component="span"
                            style={{ marginLeft: '10px' }}
                        >
                            <UploadIcon />
                        </Button>
                    </label>
                </Box>
                <TextField
                    label="Title"
                    name="title"
                    value={editedBanner.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={editedBanner.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Background"
                    name="background"
                    value={editedBanner.background}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSave} fullWidth>
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditBannerTemplateBs;
