#include <napi.h>

typedef struct TSLanguage TSLanguage;

extern "C" TSLanguage *tree_sitter_rstml();
extern "C" TSLanguage *tree_sitter_rust_with_rstml();

// "tree-sitter", "language" hashed with BLAKE2
const napi_type_tag LANGUAGE_TYPE_TAG = {
  0x8AF2E5212AD58ABF, 0xD5006CAD83ABBA16
};

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    auto rstml = Napi::Object::New(env);
    rstml["name"] = Napi::String::New(env, "rstml");
    auto rstml_language = Napi::External<TSLanguage>::New(env, tree_sitter_rstml());
    rstml_language.TypeTag(&LANGUAGE_TYPE_TAG);
    rstml["language"] = rstml_language;

    auto rust_with_rstml = Napi::Object::New(env);
    rust_with_rstml["name"] = Napi::String::New(env, "rust_with_rstml");
    auto rust_with_rstml_language = Napi::External<TSLanguage>::New(env, tree_sitter_rust_with_rstml());
    rust_with_rstml_language.TypeTag(&LANGUAGE_TYPE_TAG);
    rust_with_rstml["language"] = rust_with_rstml_language;

    exports["rstml"] = rstml;
    exports["rust_with_rstml"] = rust_with_rstml;
    return exports;
}

NODE_API_MODULE(tree_sitter_rstml_binding, Init)
