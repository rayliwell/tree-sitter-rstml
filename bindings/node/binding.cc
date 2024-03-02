#include "tree_sitter/parser.h"
#include <node.h>
#include "nan.h"

using namespace v8;

extern "C" TSLanguage * tree_sitter_rstml();
extern "C" TSLanguage * tree_sitter_rust_with_rstml();

namespace {

NAN_METHOD(New) {}

void Init(Local<Object> exports, Local<Object> module) {
  Local<FunctionTemplate> rstml_tpl = Nan::New<FunctionTemplate>(New);
  rstml_tpl->SetClassName(Nan::New("Language").ToLocalChecked());
  rstml_tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Local<Function> rstml_constructor = Nan::GetFunction(rstml_tpl).ToLocalChecked();
  Local<Object> rstml_instance = rstml_constructor->NewInstance(Nan::GetCurrentContext()).ToLocalChecked();
  Nan::SetInternalFieldPointer(rstml_instance, 0, tree_sitter_rstml());

  Nan::Set(rstml_instance, Nan::New("name").ToLocalChecked(), Nan::New("rstml").ToLocalChecked());
  Nan::Set(module, Nan::New("exports").ToLocalChecked(), rstml_instance);

  Local<FunctionTemplate> rust_with_rstml_tpl = Nan::New<FunctionTemplate>(New);
  rust_with_rstml_tpl->SetClassName(Nan::New("Language").ToLocalChecked());
  rust_with_rstml_tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Local<Function> rust_with_rstml_constructor = Nan::GetFunction(rust_with_rstml_tpl).ToLocalChecked();
  Local<Object> rust_with_rstml_instance = rust_with_rstml_constructor->NewInstance(Nan::GetCurrentContext()).ToLocalChecked();
  Nan::SetInternalFieldPointer(rust_with_rstml_instance, 0, tree_sitter_rust_with_rstml());

  Nan::Set(rust_with_rstml_instance, Nan::New("name").ToLocalChecked(), Nan::New("rust_with_rstml").ToLocalChecked());
  Nan::Set(module, Nan::New("exports").ToLocalChecked(), rust_with_rstml_instance);
}

NODE_MODULE(tree_sitter_rstml_binding, Init)

}  // namespace
