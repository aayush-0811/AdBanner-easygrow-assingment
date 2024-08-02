import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import BannerImgComp from '../components/BannerImgComp';
import EditBannerTemplateBs from '../components/EditBannerTemplateBs';
import adBanners from '../data/adBanners.json';
import Navbar from '@/components/Navbar';

const Home = () => {
  const [banners, setBanners] = useState(adBanners);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleEdit = (id: number) => {
    const banner = banners.find((banner) => banner.id === id);
    setEditingBanner(banner);
  };

  const handleSave = (editedBanner: any) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === editedBanner.id ? editedBanner : banner
    );
    setBanners(updatedBanners);
    setEditingBanner(null);
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          py: 4, // Padding top and bottom
          minHeight: '100vh', // Ensures the container takes the full height of the viewport
        }}
      >
        <Grid container spacing={4}>
          {banners.map((banner) => (
            <Grid item xs={12} sm={6} md={4} key={banner.id}>
              <BannerImgComp {...banner} onEdit={handleEdit} />
            </Grid>
          ))}
        </Grid>
        {editingBanner && (
          <EditBannerTemplateBs
            open={!!editingBanner}
            onClose={() => setEditingBanner(null)}
            banner={editingBanner}
            onSave={handleSave}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
