const axios = require('axios').default

const baseURL = 'http://127.0.0.1:54345'

const request = axios.create({
  baseURL,
  timeout: 0
})

request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      console.log('请求失败，检查网络')
    }
  },
  error => {
    console.error('请求失败了')
    return Promise.reject(error)
  }
)

/**
 * @description Membuka browser dan mengembalikan wspoint 
 * @returns {Promise<Object>} Promise<any>
 * @param {Object} data
 * @param {String} data.id ID Jendela
 * @param {Array} data.args Parameter tambahan saat memulai, tipe data array, contoh: ["--headless"]
 * @param {Boolean} data.loadExtensions Apakah memuat ekstensi
 * @param {Boolean} data.extractIp Apakah mencoba mengekstrak IP
 */
function openBrowser(data) {
  return request({ method: 'post', url: '/browser/open', data })
}

/**
 * @description Menutup browser
 * @param {String} id
 * @returns {Promise}
 */
function closeBrowser(id) {
  return request({ method: 'post', url: '/browser/close', data: { id } })
}

/**
 * @description Memperbarui browser
 * @param {Object} data
 * @returns {Promise}
 */
function createBrowser(data) {
  return request({ method: 'post', url: '/browser/update', data })
}

/**
 * @description Mengubah informasi browser, hanya mengubah konfigurasi yang diberikan.
 * @param {Object} data  Referensi item konfigurasi pembuatan
 * @returns {Promise}
 */
function updatepartial(data) {
  return request({ method: 'post', url: '/browser/update/partial', data })
}

/**
 * @description Menghapus beberapa browser secara massal
 * @param {array} ids
 */
function deleteBatchBrowser(ids) {
  return request({ method: 'post', url: '/browser/delete/ids', data: { ids } })
}

/**
 * @description Menghapus Browser
 * @param {String} id
 * @returns {Promise}
 */
function deleteBrowser(id) {
  return request({ method: 'post', url: '/browser/delete', data: { id } })
}

/**
 * @description Mendapatkan Detail Browser
 * @param {String} id
 * @returns {Promise}
 * */
function getBrowserDetail(id) {
  return request({ method: 'post', url: '/browser/detail', data: { id } })
}

/**
 * @description Mendapatkan Daftar Browser
 * @param {Object} data
 * @param {Number} data.page // Wajib diisi
 * @param {Number} data.pageSize // Wajib diisi
 * @param {String} data.groupId // ID Grup, opsional
 * @param {String} data.name // Nama Jendela, untuk pencarian fuzzy, opsional
 * @param {String} data.sortProperties // Parameter pengurutan, default nomor urut (seq), opsional
 * @param {String} data.sortDirection // Parameter urutan pengurutan, default 'desc', bisa diisi 'asc', opsional
 * @returns {Promise}
 * */
function getBrowserList(data) {
  return request({ method: 'post', url: '/browser/list', data })
}

/**
 * @description Mendapatkan Daftar Browser (Ringkas)
 */
function getBrowserConciseList(data) {
  return request({ method: 'post', url: '/browser/list/concise', data })
}

/**
 * @description Daftar Grup
 * @param {Number} page Dimulai dari 0
 * @param {Number} pageSize Contohnya 10
 * @returns {Promise}
 * */
function getGroupList(page, pageSize) {
  return request({ method: 'post', url: '/group/list', data: { page, pageSize } })
}

/**
 * @description Menambahkan Grup
 * @param {String} groupName
 * @param {Number} sortNum
 * @returns {Promise}
 * */
function addGroup(groupName, sortNum) {
  return request({ method: 'post', url: '/group/add', data: { groupName, sortNum } })
}

/**
 * @description Mengubah Grup
 * @param {String} id
 * @param {String} groupName
 * @param {Number} sortNum
 * @returns {Promise}
 * */
function editGroup(id, groupName, sortNum) {
  return request({ method: 'post', url: '/group/edit', data: { id, groupName, sortNum } })
}

/**
 * @description Menghapus Grup
 * @param {String} id
 * @returns {Promise}
 * */
function deleteGroup(id) {
  return request({ method: 'post', url: '/group/delete', data: { id } })
}

/**
 * @description Detail Grup
 * @param {String} id
 */
function getGroupDetail(id) {
  return request({ method: 'post', url: '/group/detail', data: { id } })
}

/**
 * @description Mendapatkan PID dari Jendela Tertentu
 * @param {Array} ids
 * @returns 
 */
function getPids(ids) {
  return request({ url: '/browser/pids', method: 'post', data: { ids } })
}

/**
 * @description Mendapatkan PID Jendela yang Aktif
 * @param {Array} ids
 * @returns 
 */
function getAlivePids(ids) {
  return request({ url: '/browser/pids/alive', method: 'post', data: { ids } })
}

/**
 * @description Mendapatkan PID Semua Jendela yang Aktif
 * @returns 
 */
function getAliveBrowsersPids() {
  return request({ url: '/browser/pids/all', method: 'post' })
}

/**
 * @description Memperbarui Catatan Beberapa Jendela
 * @param {String} remark
 * @param {Array} browserIds
 * @returns 
 */
function updateBrowserMemark(remark, browserIds) {
  return request({ url: '/browser/remark/update', method: 'post', data: { remark, browserIds } })
}

/**
 * @description Memperbarui Grup dari Beberapa Jendela 
 * @param {Object} data
 * @param {Number} data.groupId
 * @param {Array} data.browserIds
 */
function batchUpdateBrowserGroup(data) {
  return request({ url: '/browser/group/update', method: 'post', data })
}

/**
 * @description Menutup Beberapa Browser berdasarkan Nomor Urut
 *
 */
function closeBrowsersBySeqs(seqs) {
  return request({ url: '/browser/close/byseqs', method: 'post', data: { seqs } })
}

/**
 * @description Memperbarui Proxy Secara Massal
 * @param {Object} data
 * @param {Number} data.proxyMethod // Tipe proxy, 2 = proxy custom, 3 = ekstrak IP
 * @param {String} data.proxyType // Tipe proxy custom 
 */
function batchUpdateProxy(data) {
  return request({ url: '/browser/proxy/update', method: 'post', data })
}

module.exports = {
  openBrowser,
  closeBrowser,
  createBrowser,
  deleteBrowser,
  getBrowserDetail,
  addGroup,
  editGroup,
  deleteGroup,
  getGroupDetail,
  getGroupList,
  getBrowserList,
  getPids,
  updatepartial,
  updateBrowserMemark,
  deleteBatchBrowser,
  getBrowserConciseList,
  getAlivePids,
  getAliveBrowsersPids,
  batchUpdateBrowserGroup,
  closeBrowsersBySeqs,
  batchUpdateProxy,
  request
}
