import { Request, Response } from "express";
import { equipoService } from "./equipos.service";

export class equipoController {

    private readonly equipoService: equipoService;

    constructor(equipoService: equipoService) {
        this.equipoService = equipoService;
    }

    public async getequipos(_req: Request, res: Response): Promise<void> {
        try {
            const equipos = await this.equipoService.getAllequipos();
            res.json(equipos);
        } catch (error) {
            console.error('Error fetching equipos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getequipo(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid equipo ID' });
            return;
        }

        try {
            const equipo = await this.equipoService.getequipoById(id);

            if (equipo) {
                res.json(equipo);
            } else {
                res.status(404).json({ error: 'equipo not found' });
            }
        } catch (error: any) {
            console.error('Error fetching equipo:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async createequipo(req: Request, res: Response): Promise<void> {
        try {
            const equipo = await this.equipoService.createequipo(req.body);
            res.status(201).json(equipo);
        } catch (error: any) {
            console.error('Error creating equipo:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async updateequipo(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid equipo ID' });
            return;
        }

        try {
            const equipo = await this.equipoService.updateequipo(id, req.body);

            if (equipo) {
                res.json(equipo);
            } else {
                res.status(404).json({ error: 'equipo not found' });
            }
        } catch (error: any) {
            console.error('Error updating equipo:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteequipo(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid equipo ID' });
            return;
        }

        try {
            const deleted = await this.equipoService.deleteequipo(id);

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'equipo not found' });
            }
        } catch (error: any) {
            console.error('Error deleting equipo:', error);
            res.status(400).json({ error: error.message });
        }
    }
}