import Image from 'next/image';
import React from 'react';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface BannerProps {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
    onEdit: (id: number) => void;
}

const BannerImgComp: React.FC<BannerProps> = ({ id, title, description, cta, image, background, onEdit }) => {
    const getTextColor = (background: string): string => {
        switch (background) {
            case 'light':
                return '#000';
            case 'dark':
                return '#fff';
            default:
                return '#000';
        }
    };

    const getTemplateStyle = (background: string): React.CSSProperties => {
        switch (background) {
            case 'light':
                return { color: '#000', backgroundColor: '#f9f9f9' };
            case 'dark':
                return { color: '#fff', backgroundColor: '#333' };
            case 'blue':
                return { color: '#fff', backgroundColor: '#007bff' };
            default:
                return { color: '#000', backgroundColor: '#fff' };
        }
    };

    return (
        <Card style={{ position: 'relative', ...getTemplateStyle(background), width: '100%', height: '200px' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image src={image} alt={title} layout="fill" objectFit="cover" />
            </div>
            <CardContent style={{ position: 'absolute', top: '16px', left: '16px', right: '16px' }}>
                <Typography variant="h5" component="div" style={{ color: getTextColor(background), fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="body2" style={{ color: getTextColor(background), marginBottom: '16px', fontSize: 15 }}>
                    {description}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '30%',
                    transform: 'translateX(-50%)',
                    backgroundColor: background === 'light' ? '#333' : '#fff',
                    color: background === 'light' ? '#fff' : '#000'
                }}
            >
                {cta}
            </Button>
            <IconButton
                style={{ position: 'absolute', top: 10, right: 10, color: getTextColor(background) }}
                onClick={() => onEdit(id)}
            >
                <EditIcon />
            </IconButton>
        </Card>
    );
};

export default BannerImgComp;
