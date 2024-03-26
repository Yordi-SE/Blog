import { Request, Response } from 'express'
import Tag, { ITag } from '../model/tagSchema';

export const createTag = async (req: Request, res: Response): Promise<void> => {
    const { tagName } = req.body;
    try {
        const tag: ITag = new Tag({
            tagName
        });

        await tag.save();
        res.status(201).json("message: tag created");

    } catch (error) {
        res.status(500).json({ message: 'internal server error occured' });
    }

}

export const getAllTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags = await Tag.find()
        if (!tags) {
            res.status(404).json({ message: 'no tags found' })
        }
        res.status(200).json({ message: 'todos', tags });

    } catch (error) {
        res.status(500).json({ message: 'internal server error ' })
    }
}


export const updateTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const { tagName } = req.body;

        const updatedTag = await Tag.findByIdAndUpdate(
            id,
            { tagName },
            { new: true }
        );

        if (!updatedTag) {
            res.status(404).json({ message: 'tag not found' });
        }
        res.status(200).json({ mesaage: 'tag updated', updatedTag });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occurred' });
    }
}

export const deleteTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const deletedTag = await Tag.findByIdAndDelete(id);
        if (!deletedTag) {
            res.status(404).json({ message: 'tag not found' });
        }
        res.status(200).json({ mesaage: 'tag deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error occurred' });
    }
}






