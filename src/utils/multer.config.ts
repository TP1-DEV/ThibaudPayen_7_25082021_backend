import {Request} from 'express'
import multer from 'multer'
import {extname} from 'path'

export const editFileName = (req: Request, file: Express.Multer.File, cb) => {
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  return cb(null, `${randomName}${extname(file.originalname)}`)
}

export const imageFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg, png or gif'))
  }
}
