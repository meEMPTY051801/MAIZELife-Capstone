import tensorflow as tf
import numpy as np
import os

from tensorflow import keras



#model = keras.models.load_model('model.h5')
model = keras.models.load_model('model_inceptionv3_v2.h5')


class dieses_predictor():

    

    def predict_dieses(self, image):
        #VGG16 
        # input_size = (260, 260)
        # img_gen =  keras.preprocessing.image.ImageDataGenerator(rescale=1/255.0)
        # my_image = tf.keras.utils.load_img(
        #     image,target_size=input_size
        # )

        
        # input_arr = tf.keras.preprocessing.image.img_to_array(my_image)
        # input_arr = np.array([input_arr])
        # img_data = img_gen.flow(input_arr)
        # prediction = model.predict(img_data)

        # all_pred2=[]
        # for i in prediction:
        #     all_pred2.append(np.argmax(i))

        # return label[all_pred2[0]]




        img_data = tf.reshape(self.read_file( image), [1,299,299,3])
        label = ['Blight','Common_Rust','Gray_Leaf_Spot','Healthy','Invalid']
        temp = model.predict(img_data).argmax(-1)
        # print(label[temp[0]])
        return label[temp[0]]

    def read_file(self, file_name):
        INPUT_HEIGHT = 299
        INPUT_WIDTH  = 299
        INPUT_MEAN   = 127.5
        INPUT_STD    = 127.5
        file_reader   = tf.io.read_file(file_name, "file_reader")
        image_reader  = tf.image.decode_jpeg(file_reader, channels = 3, name='jpeg_reader')
        float_caster  = tf.cast(image_reader, tf.float32)
        dims_expander = tf.expand_dims(float_caster, 0)
        resized       = tf.image.resize(dims_expander, [INPUT_HEIGHT, INPUT_WIDTH])
        normalized    = tf.divide(tf.subtract(resized, [INPUT_MEAN]), [INPUT_STD])
        return normalized
   
     

