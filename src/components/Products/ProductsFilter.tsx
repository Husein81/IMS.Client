/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Category } from "../../app/models/Category";

interface Props {
  categories: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectCategoryHandler: (category: Category) => void;
}

const ProductsFilter: FC<Props> = ({ categories, setCategory, selectCategoryHandler }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
  };

  const content = categories.map((category) => (
    <Box key={category.id} px={'2px'}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => selectCategoryHandler(category)}
      >
        {category.name}
      </Button>
    </Box>
  ));

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Button variant="contained" color="primary" onClick={() => setCategory(null)}>
        All
      </Button>
      <Box> 
        <Slider {...settings}>
            {content}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductsFilter;
