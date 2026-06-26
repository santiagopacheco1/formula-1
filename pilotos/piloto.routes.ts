import { Router } from "express";
import { PilotoController } from "./piloto.controller";

export class PilotoRoutes {

    public readonly router = Router();

    constructor(private readonly pilotoController: PilotoController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/pilotos', this.pilotoController.getPilotos.bind(this.pilotoController));
        this.router.get('/piloto/:id', this.pilotoController.getPiloto.bind(this.pilotoController));
        this.router.post('/piloto', this.pilotoController.createPiloto.bind(this.pilotoController));
        this.router.put('/piloto/:id', this.pilotoController.updatePiloto.bind(this.pilotoController));
        this.router.delete('/piloto/:id', this.pilotoController.deletePiloto.bind(this.pilotoController));
    }

}