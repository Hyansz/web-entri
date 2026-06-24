import Certification from "../models/Certification.js";
import cloudinary from "../config/cloudinary.js";

/* =======================
GET LIST (PAGINATED)
======================= */
export const getCertifications = async (req, res, next) => {
    try {
        let {
            page = 1,
            limit = 10,
            search = "",
            active,
        } = req.cleanedQuery || req.query;

        page = Math.max(1, parseInt(page));
        limit = Math.max(1, parseInt(limit));

        const filter = {};

        // ✅ TEXT SEARCH (lebih optimal dari regex)
        if (search?.trim()) {
            filter.$text = { $search: search.trim() };
        }

        if (active !== undefined) {
            filter.active = active === "true";
        }

        const total = await Certification.countDocuments(filter);

        const data = await Certification.find(filter)
            .sort({ order: 1, createdAt: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            },
        });
    } catch (err) {
        next(err);
    }
};

/* =======================
GET ALL (UNTUK FRONTEND GRID)
======================= */
export const getAllCertifications = async (req, res, next) => {
    try {
        const data = await Certification.find({ active: true }).sort({
            order: 1,
            createdAt: -1,
        });

        res.json({
            data,
            total: data.length,
        });
    } catch (err) {
        next(err);
    }
};

/* =======================
GET BY ID
======================= */
export const getCertificationById = async (req, res, next) => {
    try {
        const cert = await Certification.findById(req.params.id);

        if (!cert) {
            return res.status(404).json({
                message: "Certification not found",
            });
        }

        res.json(cert);
    } catch (err) {
        next(err);
    }
};

/* =======================
CREATE
======================= */
export const createCertification = async (req, res, next) => {
    try {
        const { title, description, order, active } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                message: "Title required",
            });
        }

        const image = req.file
            ? {
                  url: req.file.path,
                  public_id: req.file.filename,
              }
            : null;

        const certification = new Certification({
            title,
            description,
            order: order || 0,
            active: active !== undefined ? active === "true" : true,
            image,
        });

        await certification.save();

        res.status(201).json(certification);
    } catch (err) {
        next(err);
    }
};

/* =======================
UPDATE
======================= */
export const updateCertification = async (req, res, next) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({
                message: "Certification not found",
            });
        }

        const fields = ["title", "description", "order", "active"];

        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                if (field === "active") {
                    certification[field] = req.body[field] === "true";
                } else {
                    certification[field] = req.body[field];
                }
            }
        });

        // ✅ REMOVE IMAGE
        if (req.body.removeImage === "true") {
            if (certification.image?.public_id) {
                await cloudinary.uploader.destroy(
                    certification.image.public_id,
                );
            }
            certification.image = null;
        }

        // ✅ REPLACE IMAGE
        if (req.file) {
            if (certification.image?.public_id) {
                await cloudinary.uploader.destroy(
                    certification.image.public_id,
                );
            }

            certification.image = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        await certification.save();

        res.json(certification);
    } catch (err) {
        next(err);
    }
};

/* =======================
DELETE
======================= */
export const deleteCertification = async (req, res, next) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({
                message: "Certification not found",
            });
        }

        if (certification.image?.public_id) {
            await cloudinary.uploader.destroy(certification.image.public_id);
        }

        await certification.deleteOne();

        res.json({
            message: "Certification deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};
