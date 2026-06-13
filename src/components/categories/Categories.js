import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import Carousel from 'react-elastic-carousel';
import "./Categories.css";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { hotelCategory, setHotelCategory } = useCategory();

    const { filterDispatch } = useFilter();

    const handleFilterClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "https://tripnest-backend-lkfl.onrender.com/api/categories"
                );
                setCategories(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        setHotelCategory(category);
    };

    return (
        <section className="categories d-flex gap">
            <Swiper
                spaceBetween={10}
                slidesPerView={9}
            >
                {categories?.map(({ _id, category }) => (
                    <SwiperSlide key={_id}>
                        <span
                            className={`${category === hotelCategory ? "category-color" : ""} item`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div>
                <button
                    className="button btn-filter d-flex align-center gap-small cursor-pointer"
                    onClick={handleFilterClick}
                >
                    <span className="material-icons-outlined">filter_alt</span>
                    <span>Filter</span>
                </button>
            </div>

        </section>


    );
};