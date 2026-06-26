import { Router } from "express";
import { equipoController } from "./equipos.controller";

export class EquipoRoutes {

    public readonly router = Router();

    constructor(private readonly equipoController: equipoController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/equipos', this.equipoController.getequipos.bind(this.equipoController));
        this.router.get('/equipo/:id', this.equipoController.getequipo.bind(this.equipoController));
        this.router.post('/equipo', this.equipoController.createequipo.bind(this.equipoController));
        this.router.put('/equipo/:id', this.equipoController.updateequipo.bind(this.equipoController));
        this.router.delete('/equipo/:id', this.equipoController.deleteequipo.bind(this.equipoController));
    }

}