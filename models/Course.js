const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a course description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a course description']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add minimum skill'],
    enum: ['beginner', 'intermediate', 'advance']
  },
  scholarshipAvailabl: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
});

// static method to get avg of course tuition
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  console.log('Calcalating avg cost...');
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' }
      }
    }
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (error) {
    console.error(error);
  }
};

// call get AverageCost after save
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp);
});

// call getAverageCost before remove
CourseSchema.post('remove', function() {
  this.constructor.getAverageCost(this.bootcamp);
});
module.exports = mongoose.model('Course', CourseSchema);
