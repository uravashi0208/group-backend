const messages = require("../constant/message");
const GroupList = require("../model/grouplist");
const Category = require("../model/category");
const AboutUs = require("../model/aboutus");
const PrivacyPolicy = require("../model/privacy_policy");
const { ObjectId } = require("mongodb");

exports.add_group = async (req, res, next) => {
  try {
    // Create user data
    let userdata;
    if (req.files && req.files.group_image) {
      userdata = {
        group_name: req.body.group_name,
        category_id: req.body.category_id,
        group_link: req.body.group_link,
        group_image: `https://group-backend-nece.onrender.com/uploads/groupimage/${req.files.group_image[0].filename}`,
        group_description: req.body.last_nagroup_descriptionme,
      };
    } else {
      userdata = {
        category_id: req.body.category_id,
        group_link: req.body.group_link,
      };
    }

    // Create the user in the database
    await GroupList.create(userdata);

    // Send response
    return res.json({
      response: true,
      message: messages.ADD_GROUP,
    });
  } catch (error) {
    return next(error);
  }
};

exports.add_category = async (req, res, next) => {
  try {
    // Create user data
    let userdata = {
      category_name: req.body.category_name,
      category_description: req.body.category_description,
      category_image: `https://group-backend-nece.onrender.com/uploads/category/${req.files.category_image[0].filename}`,
    };

    // Create the user in the database
    await Category.create(userdata);

    // Send response
    return res.json({
      response: true,
      message: messages.ADD_CATEGORY,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const categorylist = await Category.aggregate(pipeline).exec();

    const totalCountPipeline = [
      {
        $count: "totalCount",
      },
    ];

    const totalCountResult = await Category.aggregate(
      totalCountPipeline
    ).exec();
    const totalCount = totalCountResult[0] ? totalCountResult[0].totalCount : 0;

    if (categorylist && categorylist.length > 0) {
      res.json({
        response: true,
        data: categorylist,
        page,
        pageSize,
        totalCount,
      });
    } else {
      res.json({
        response: false,
        message: "No data found.",
      });
    }
  } catch (err) {
    res.status(500).json({
      response: false,
      message: `An error occurred while fetching leads.`,
    });
  }
};

exports.getAllGroup = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const grouplist = await GroupList.aggregate(pipeline).exec();

    const totalCountPipeline = [
      {
        $count: "totalCount",
      },
    ];

    const totalCountResult = await GroupList.aggregate(
      totalCountPipeline
    ).exec();
    const totalCount = totalCountResult[0] ? totalCountResult[0].totalCount : 0;

    if (grouplist && grouplist.length > 0) {
      res.json({
        response: true,
        data: grouplist,
        page,
        pageSize,
        totalCount,
      });
    } else {
      res.json({
        response: false,
        message: "No data found.",
      });
    }
  } catch (err) {
    res.status(500).json({
      response: false,
      message: `An error occurred while fetching leads.`,
    });
  }
};

exports.getAllLinks = async (req, res, next) => {
  try {
    let page = 1;
    let pageSize = 10;
    const pipeline = [
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    if (req.query.search) {
      pipeline.unshift({
        $match: {
          group_name: new RegExp(req.query.search, "i"),
        },
      });
    } else {
      page = parseInt(req.query.page) || 1;
      pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      pipeline.unshift({ $skip: skip }, { $limit: pageSize });
    }

    const allLinksList = await GroupList.aggregate(pipeline).exec();

    const totalCountPipeline = [
      {
        $count: "totalCount",
      },
    ];

    const totalCountResult = await GroupList.aggregate(
      totalCountPipeline
    ).exec();
    const totalCount = req.query.search
      ? allLinksList.length > 0
        ? allLinksList.length
        : totalCountResult[0]
        ? totalCountResult[0].totalCount
        : 0
      : 0;

    if (allLinksList && allLinksList.length > 0) {
      res.json({
        response: true,
        data: allLinksList,
        page,
        pageSize,
        totalCount,
      });
    } else {
      res.json({
        response: false,
        message: "No data found.",
      });
    }
  } catch (err) {
    res.status(500).json({
      response: false,
      message: `An error occurred while fetching leads.`,
    });
  }
};

exports.getAllLinkByCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pipeline = [
      {
        $match: {
          category_id: new ObjectId(id),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const allLinksListByCategory = await GroupList.aggregate(pipeline).exec();

    if (allLinksListByCategory && allLinksListByCategory.length > 0) {
      res.json({
        response: true,
        data: allLinksListByCategory,
      });
    } else {
      res.json({
        response: false,
        message: "No data found.",
      });
    }
  } catch (err) {
    res.status(500).json({
      response: false,
      message: `An error occurred while fetching leads.`,
    });
  }
};

exports.deletelinks = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const deletedLinks = await GroupList.findByIdAndDelete(_id);
    if (!deletedLinks) {
      res.json({ response: false, message: messages.NO_DATA_FOUND });
    } else {
      res.json({
        response: true,
        message: messages.DELETE_LINKS,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getAboutUs = async (req, res, next) => {
  try {
    const aboutusdata = await AboutUs.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    if (aboutusdata.length > 0) {
      res.status(200).json({ response: true, data: aboutusdata[0] });
    } else {
      res
        .status(404)
        .json({ response: false, message: messages.NO_DATA_FOUND });
    }
  } catch (error) {
    next(error);
  }
};

exports.getPrivacyPolicy = async (req, res, next) => {
  try {
    const privacypolicydata = await PrivacyPolicy.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    if (privacypolicydata.length > 0) {
      res.status(200).json({ response: true, data: privacypolicydata[0] });
    } else {
      res
        .status(404)
        .json({ response: false, message: messages.NO_DATA_FOUND });
    }
  } catch (error) {
    next(error);
  }
};
