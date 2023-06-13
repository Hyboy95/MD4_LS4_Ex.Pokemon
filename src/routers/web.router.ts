import express from "express";
import { PokemonController } from "../controllers/api_controller/pokemon.controller";
export const router = express.Router();

router.get('/', PokemonController.getAllPokemon);
router.get('/pokemon/:id', PokemonController.getDetailPokemon);