/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import React, { FC } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Category } from "../../app/models/Category";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

interface Props {
  categories: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  selectCategoryHandler: (category: Category) => void;
}

const ProductsFilter: FC<Props> = ({
  categories,
  setCategory,
  selectCategoryHandler,
}) => {
  const list = categories.map((category) => (
    <SwiperSlide key={category.id}>
      <Box
        component={"img"}
        mx={1}
        src={category.imageUrls![0]}
        alt={category.name}
        sx={{
          borderRadius: "50%",
          cursor: "pointer",
          height: 50,
          width: 50,
          "&:hover": {
            transform: "scale(.9)",
            transition: "all 0.3s",
          },
        }}
        textAlign={"center"}
        bgcolor={"primary.main"}
        onClick={() => selectCategoryHandler(category)}
      />
    </SwiperSlide>
  ));

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCategory(null)}
      >
        All
      </Button>
      {/* Wrap all SwiperSlide components inside one Swiper */}
      <Box width="450px" display={"flex"} justifyContent={"flex-end"}>
        <Swiper slidesPerView={4} spaceBetween={10}>
          {list}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ProductsFilter;
