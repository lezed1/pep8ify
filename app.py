import tornado.ioloop
import tornado.web
import os
import autopep8

from tornado import template
from pyjade.ext.tornado import patch_tornado
patch_tornado()

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static")
}


class MainHandler(tornado.web.RequestHandler):

    def post(self):
        self.write(autopep8.fix_code(self.get_argument("code")))

application = tornado.web.Application([
    (r"/pep8ify", MainHandler),
    (r"/(.*)", tornado.web.StaticFileHandler,
     {"path": settings['static_path'], "default_filename": "index.html"}),
], settings)

if __name__ == "__main__":
    application.listen(os.environ["PORT"] if "PORT" in os.environ else 3000)
    tornado.ioloop.IOLoop.instance().start()
