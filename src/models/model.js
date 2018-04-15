const { Model } = require('objection');
const boom = require('boom');

class BaseModel extends Model {
   static get defaultEager() {
      return '';
   }

   static get defaultOmit() {
      return [''];
   }

   static createNotFoundError() {
      return boom.notFound();
   }

   static createOne({ attributes, trx }) {
      return this.query(trx).insertGraphAndFetch(attributes);
   }

   static deleteOneById({ id, trx }) {
      return this.query(trx)
         .deleteById(id)
         .throwIfNotFound();
   }

   static getMany() {
      return this.query().eager(this.defaultEager).omit(this.defaultOmit);
   }

   static getManyWith({ attributes }) {
      return this.query()
         .where(attributes)
         .eager(this.defaultEager)
         .throwIfNotFound();
   }
   
   static getOne({ attributes }) {
      return this.query()
         .findOne(attributes)
         .eager(this.defaultEager)
         .throwIfNotFound();
   }

   static getOneById({ id }) {
      return this.query()
         .findById(id)
         .eager(this.defaultEager)
         .throwIfNotFound();
   }

   static patchOne({ id, attributes }) {
      return this.query()
         .patchAndFetchById(id, attributes)
         .eager(this.defaultEager)
         .throwIfNotFound();
   }
}

module.exports = BaseModel;