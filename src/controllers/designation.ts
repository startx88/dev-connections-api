import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Designation, DesignationDoc } from "../models/designation";
import { responseBody, slugname, transformRespnose } from "../utility";

/**
 * Get all skills
 * */
const getDesignations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const designations = await Designation.find({ active: true }).sort({
      insertAt: 1,
    });
    return res.status(200).send(
      responseBody({
        message: "Fetch all designations",
        data: transformRespnose(designations),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const addUpdateDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const desigId = req.params.desigId;

    const existDesignation = (await Designation.findById(
      desigId
    )) as DesignationDoc;

    const { title } = req.body;
    let slug = req.body.slug;

    if (existDesignation) {
      slug = slugname(title);
      existDesignation.title = title;
      existDesignation.slug = slug;
      existDesignation.insertAt = new Date();
      await existDesignation.save();
      return res.status(200).send(
        responseBody({
          message: "Designation updated!",
          id: desigId,
          data: transformRespnose(existDesignation),
        })
      );
    } else {
      if (slug === "") {
        slug = slugname(title);
      }
      const isslug = await Designation.findOne({ slug: slug, title: title });
      if (isslug) {
        throw new BadRequestError("Designation already exited!");
      }
      const designation = Designation.build({
        title: title,
        slug: slug,
      });

      await designation.save();
      return res.status(200).send(
        responseBody({
          message: "Designation added!",
          data: transformRespnose(designation),
        })
      );
    }
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const deleteDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const desigId = req.params.desigId;
    const designation = await Designation.findById(desigId);
    if (!designation) {
      throw new NotFoundError("Designation not existed");
    }
    await designation.remove();
    return res.status(200).send(
      responseBody({
        message: "Designation deleted successfully",
        id: designation._id,
        data: transformRespnose(designation),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const activeDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const desigId = req.params.desigId;
    const designation = await Designation.findById(desigId);
    if (!designation) {
      throw new NotFoundError("Designation not found!");
    }
    if (designation.active) {
      throw new BadRequestError("Designation already activated!");
    }
    designation.active = true;
    await designation.save();
    return res.status(200).send(
      responseBody({
        message: "Designation active successfully",
        id: designation._id,
        data: transformRespnose(designation),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const deactiveDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const desigId = req.params.desigId;
    const designation = await Designation.findById(desigId);
    if (!designation) {
      throw new NotFoundError("Designation not found!");
    }
    if (!designation.active) {
      throw new BadRequestError("Designation already deactivated!");
    }
    designation.active = false;
    await designation.save();
    return res.status(200).send(
      responseBody({
        message: "Designation deactive successfully",
        id: designation._id,
        data: transformRespnose(designation),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// export
export {
  getDesignations,
  addUpdateDesignation,
  deleteDesignation,
  activeDesignation,
  deactiveDesignation,
};
