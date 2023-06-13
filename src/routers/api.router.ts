import express from "express";
import { PokemonController } from "../controllers/api_controller/pokemon.controller";
export const APIRouter = express.Router();

APIRouter.get('/', PokemonController.getAllPokemon);
APIRouter.get('/pokemon/:id', PokemonController.getDetailPokemon);