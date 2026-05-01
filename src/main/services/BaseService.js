class BaseService {
    constructor(model) {
        this.model = model;
    }

    create(data) {
        try {
            const id = this.model.create(data);
            return { success: true, id };
        } catch (error) {
            return this.handleError(error);
        }
    }

    getAll() {
        try {
            const data = this.model.getAll();
            return { success: true, data };
        } catch (error) {
            return this.handleError(error);
        }
    }

    update(id, data) {
        try {
            this.model.update(id, data);
            return { success: true };
        } catch (error) {
            return this.handleError(error);
        }
    }

    delete(id) {
        try {
            this.model.delete(id);
            return { success: true };
        } catch (error) {
            return this.handleError(error);
        }
    }

    handleError(error) {
        console.error(error);
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = BaseService;