import { Request, Response } from "express";
import { PilotoService } from "./piloto.service";

export class PilotoController {

    private readonly pilotoService: PilotoService;

    constructor(pilotoService: PilotoService) {
        this.pilotoService = pilotoService;
    }

    public async getPilotos(_req: Request, res: Response): Promise<void> {
        try {
            const pilotos = await this.pilotoService.getAllPilotos();
            res.json(pilotos);
        } catch (error) {
            console.error('Error fetching pilotos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getPiloto(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid piloto ID' });
            return;
        }

        try {
            const piloto = await this.pilotoService.getPilotoById(id);

            if (piloto) {
                res.json(piloto);
            } else {
                res.status(404).json({ error: 'Piloto not found' });
            }
        } catch (error: any) {
            console.error('Error fetching piloto:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async createPiloto(req: Request, res: Response): Promise<void> {
        try {
            const piloto = await this.pilotoService.createPiloto(req.body);
            res.status(201).json(piloto);
        } catch (error: any) {
            console.error('Error creating piloto:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async updatePiloto(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid piloto ID' });
            return;
        }

        try {
            const piloto = await this.pilotoService.updatePiloto(id, req.body);

            if (piloto) {
                res.json(piloto);
            } else {
                res.status(404).json({ error: 'Piloto not found' });
            }
        } catch (error: any) {
            console.error('Error updating piloto:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async deletePiloto(req: Request<{ id: string }>, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id || id.trim().length === 0) {
            res.status(400).json({ error: 'Invalid piloto ID' });
            return;
        }

        try {
            const deleted = await this.pilotoService.deletePiloto(id);

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Piloto not found' });
            }
        } catch (error: any) {
            console.error('Error deleting piloto:', error);
            res.status(400).json({ error: error.message });
        }
    }
}