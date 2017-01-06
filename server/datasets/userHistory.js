var mongoose = require('mongoose');

var UserHistorySchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    briefDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String,
        required: true
    },
    prescribedDoctor: {
        type: String,
        required: true
    },
    prescribedDoctorAddress: {
        type: String,
        required: true
    },
    prescribedDoctorContact: {
        type: String,
        required: true
    },
    reports: [{
        reportof: {
            type: String,
            required: true
        },
        symptoms: {
            type: String,
            required: true
        },
        briefDesc: {
            type: String,
            required: true
        },
        longDesc: {
            type: String,
            required: true
        },
        conclusion: {
            type: String,
            required: true
        },
        findings: {
            type: String,
            required: true
        },
        reportImages: [{
            imageTitle: String,
            imageDescription: String,
            imageUrl: String,
            metadata: { type: Array, default: [] }
        }],
        prescribedDoctor: {
            type: String,
            required: true
        },
        prescribedDoctorAddress: {
            type: String,
            required: true
        },
        prescribedDoctorContact: {
            type: String,
            required: true
        },
        uploadedBy: {
            type: String,
            required: true
        },
        uploadedOn: {
            type: Date,
            default: new Date()
        },
        uploaderAddress: {
            type: String,
            required: true
        },
        uploaderContact: {
            type: String,
            required: true
        },
        metadata: { type: Array, default: [] }
    }]
}, {
    timestamps: {
        createdAt: 'CreatedOn',
        updatedAt: 'UpdatedOn'
    }
});

module.exports = mongoose.model('UserHistory', UserHistorySchema);
