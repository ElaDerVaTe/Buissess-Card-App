import {  Grid } from "@mui/material";
import React,{useState} from "react";
import CardComponent from "./card/Card";
import { arrayOf } from "prop-types";
import cardType from "../models/types/cardType";
import CardForm from "./CardForm";
import { deleteCard, changeLikeStatus, editCard } from "../services/cardService";
import initialCardForm from "../helpers/normalization/initial-forms/initialCardForm";
import cardSchema from "../models/joi-schema/cardSchema";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";


const Cards = ({cards}) => {
  const [edited, onEdited] = useState(false);

  const { handleChangeCard } = useCards();

  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleChangeCard
  );
  
  const onLike = async (cardId) => {
    await changeLikeStatus(cardId)
    console.log(`you liked card no:${cardId}`);
  }
  const onDelete = async (cardId) =>{
    await deleteCard(cardId)
    console.log(`you deleted card no:${cardId}`);
  }

  const onEdit = async (cardId) =>{ 
    onEdited(!edited)
    //await editCard(value.data)
  };
  if(edited){
    return (
        <Grid container spacing={2} pb={2}>
          {cards.map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                onLike={onLike}
                onDelete={onDelete}
                onEdit={onEdit}
                card={card}
              />
            </Grid>
          ))}
          <CardForm 
            title="Edit Card"
            onSubmit={rest.onSubmit}
            onReset={rest.handleReset}
            errors={value.errors}
            onFormChange={rest.validateForm}
            onInputChange={rest.handleChange}
            data={value.data}
          />
        </Grid>
      
    ); 
  }
  else{
    return (
      <Grid container spacing={2} pb={2}>
        {cards.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              onLike={onLike}
              onDelete={onDelete}
              onEdit={onEdit}
              card={card}
            />
          </Grid>
        ))}
      </Grid>
  ); 
  }

};

Cards.propTypes = {
  cards: arrayOf(cardType).isRequired,
};

export default Cards;
