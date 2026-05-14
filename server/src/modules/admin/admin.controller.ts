import { Request, Response } from 'express';
import * as service from './admin.service';
import { asyncHandlder } from '../../utils/asyncHandler';

export const createAdminController = asyncHandlder(
  async (req: Request, res: Response) => {
    const admin = await service.createAdminService(req.body, req.user!.id);

    const { passwordHash, ...safeAdmin } = admin;

    res.status(201).json({
      success: true,
      data: safeAdmin,
    });
  },
);

export const getAdminsCotroller = asyncHandlder(
  async (req: Request, res: Response) => {
    const admins = await service.getAdminsService();

    const sanitizedAdmins = admins.map(({ passwordHash, ...admin }) => admin);

    res.status(200).json({
      success: true,
      data: sanitizedAdmins,
    });
  },
);

export const getAdminByIdController = asyncHandlder(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const admin = await service.getAdminByIdService(id);

    const { passwordHash, ...safeAdmin } = admin;

    res.status(200).json({
      success: true,
      data: safeAdmin,
    });
  },
);
