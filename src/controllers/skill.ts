import { NextFunction, Request, Response } from "express";
import { transform } from "lodash";
import { BadRequestError, NotFoundError } from "../errors";
import { admin } from "../middleware";
import { Skill, SkillAttr, SkillDoc } from "../models/skills";
import { responseBody, slugname, transformRespnose } from "../utility";

/**
 * Get all skills
 * */
const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.find({ active: true }).sort({ insertAt: 1 });
    return res.status(200).send(
      responseBody({
        message: "Fetch all skills",
        data: transformRespnose(skills),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const addUpdateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skillId = req.params.skillId;

    const existSkill = (await Skill.findById(skillId)) as SkillDoc;

    const { title } = req.body;
    let slug = req.body.slug;

    if (existSkill) {
      slug = slugname(title);
      existSkill.title = title;
      existSkill.slug = slug;
      existSkill.insertAt = new Date();
      await existSkill.save();
      return res.status(200).send(
        responseBody({
          message: "Skill updated!",
          id: skillId,
          data: transformRespnose(existSkill),
        })
      );
    } else {
      if (slug === "") {
        slug = slugname(title);
      }
      const isslug = await Skill.findOne({ slug: slug, title: title });
      if (isslug) {
        throw new BadRequestError("Skill already exited!");
      }
      const skill = Skill.build({
        title: title,
        slug: slug,
      });

      await skill.save();
      return res.status(200).send(
        responseBody({
          message: "Skill added!",
          data: transformRespnose(skill),
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
const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skillId = req.params.skillId;
    const skill = await Skill.findById(skillId);
    if (!skill) {
      throw new NotFoundError("Skill not existed");
    }
    await skill.remove();
    return res.status(200).send(
      responseBody({
        message: "Skill deleted successfully",
        id: skill._id,
        data: transformRespnose(skill),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const activeSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skillId = req.params.skillId;
    const skill = await Skill.findById(skillId);
    if (!skill) {
      throw new NotFoundError("Skill not found!");
    }
    if (skill.active) {
      throw new BadRequestError("Skill already activated!");
    }
    skill.active = true;
    await skill.save();
    return res.status(200).send(
      responseBody({
        message: "Skill active successfully",
        id: skill._id,
        data: transformRespnose(skill),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * Get all skills
 * */
const deactiveSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skillId = req.params.skillId;
    const skill = await Skill.findById(skillId);
    if (!skill) {
      throw new NotFoundError("Skill not found!");
    }
    if (!skill.active) {
      throw new BadRequestError("Skill already deactivated!");
    }
    skill.active = false;
    await skill.save();
    return res.status(200).send(
      responseBody({
        message: "Skill deactive successfully",
        id: skill._id,
        data: transformRespnose(skill),
      })
    );
  } catch (err) {
    throw next(err);
  }
};

// export
export { getSkills, addUpdateSkill, deleteSkill, activeSkill, deactiveSkill };
